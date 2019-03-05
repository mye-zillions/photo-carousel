const pgConfig = require('../config.js').pgConfig;
const copyFrom = require('pg-copy-streams').from;
const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');

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

var query = async (query) => {
	const pool = new Pool(pgConfig);

	await pool.connect();
	var begin = Date.now();

	return new Promise((resolve, reject) => {
		pool.query(query, (err, res) => {
			console.log(Date.now() - begin);
			if (err) reject(err);
			else resolve(res.rows);
		});
	});	
};

var getDetails = async (id) => {
	console.log(`READ PROPERTY ${id}`);
	await query(`SELECT * FROM properties WHERE id = ${id};`);
};

var getPhotos = async (id) => {
	console.log(`READ PHOTOS ${id}`);
	await query(`SELECT * FROM photos WHERE property_id = ${id};`);
};

var createProperty = async (id) => {
	console.log(`CREATE PROPERTY ${id}`);
	await query(`
		INSERT INTO properties 
		(id, bath_count, bed_count, name, price, sq_ft) 
		VALUES (${id}, 5, 4, 'FAKE PROPERTY', 666, 704)
		ON CONFLICT DO NOTHING;
	`);
};

var updateProperty = async (id) => {
	console.log(`UPDATE PROPERTY ${id}`);
	await query(`
		UPDATE properties
		SET sq_ft = 0
		WHERE id = ${id};
	`);
};

var deleteProperty = async (id) => {
	console.log(`DELETE PROPERTY ${id}`);
	await query(`DELETE FROM properties WHERE id = ${id};`);
};

var pgHandler = async () => {
	const pool = new Pool(pgConfig);

	pool.connect(async (err, client, done) => {
		const res = await client.query('SELECT NOW()', (err, res) => {
			console.log(err, res.rows[0].now);
		});

		await makeSchema(client);

		await bulkCopy(client, done);
	});
};

var CRUD = async (id) => {
	await getDetails(id);
	await getPhotos(id);
	await createProperty(id);
	await updateProperty(id);
	await deleteProperty(id);
};

const ids = [0, ~~(10e6 / 2), 10e6 - 1];

(async () => {
	console.log('POSTGRES CRUD TEST');
	for (let i = 0; i < ids.length; i++) {
		await CRUD(ids[i]);
		console.log('=============');
	}
	new Pool(pgConfig).end(() => {
		console.log('POSTGRES CLIENT SHUTDOWN');
		process.exit();
	})
})();

module.exports = { pgHandler, getDetails, getPhotos };