const pgConfig = require('../config.js').pgConfig;
const copyFrom = require('pg-copy-streams').from;
const path = require('path');
const fs = require('fs');

var makeSchema = async (user) => {
	await user.query(`
		DROP TABLE IF EXISTS properties CASCADE;
		CREATE TABLE properties (
			id SERIAL PRIMARY KEY,
			name text,
			price integer,
			bed_count integer,
			bath_count integer,
			sq_ft integer
		);
		`, (err, res) => {
		if (err) throw err;
		console.log('SCHEMA:', res);
	});
	await user.query(`
		DROP TABLE IF EXISTS photos;
		CREATE TABLE photos (
			id SERIAL PRIMARY KEY,
			property_id integer REFERENCES properties ON DELETE CASCADE,
			url text
		);
		`, (err, res) => {
		if (err) throw err;
	});
};

var bulkCopy = async (user, done) => {
	var propertiesPath = path.resolve(__dirname, '..', 'properties.csv');
	var photosPath = path.resolve(__dirname, '..', 'photos.csv');
	var propertiesFileStream = fs.createReadStream(propertiesPath);
	var photoFileStream = fs.createReadStream(photosPath);
	var propertyStream = user.query(copyFrom("COPY properties FROM STDIN WITH CSV DELIMITER ','"));
	propertiesFileStream.pipe(propertyStream);
	var photoStream = user.query(copyFrom("COPY photos FROM STDIN WITH CSV DELIMITER ','"));
	photoFileStream.pipe(photoStream);
	photoStream.on('end', () => {
		console.log('FINISHED BULK COPY');
		done();
	});
};

var getDetails = async (id) => {
	const { Pool } = require('pg');
	const pool = new Pool(pgConfig);

	await pool.connect();

	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM properties WHERE id = ${id}`, (err, res) => {
			console.log(res.rows);
			if (err) reject(err);
			else resolve(res.rows);
		});
	});
};

var getPhotos = async (id) => {
	const { Pool } = require('pg');
	const pool = new Pool(pgConfig);

	await pool.connect();

	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM photos WHERE property_id = ${id}`, (err, res) => {
			console.log(res.rows);
			if (err) reject(err);
			else resolve(res.rows);
		});
	});
};

var pgHandler = async () => {
	const { Client, Pool } = require('pg');
	const pool = new Pool(pgConfig);

	pool.connect(async (err, client, done) => {
		const res = await client.query('SELECT NOW()', (err, res) => {
			console.log(err, res.rows[0].now);
		});

		await makeSchema(client);

		await bulkCopy(client, done);
	});
};

module.exports = { pgHandler, getDetails, getPhotos };