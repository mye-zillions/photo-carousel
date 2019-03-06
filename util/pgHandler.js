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
	// var begin = Date.now();

	return new Promise((resolve, reject) => {
		pool.query(query, (err, res) => {
			// console.log(Date.now() - begin);
			if (err) reject(err);
			else resolve(res.rows);
		});
	});	
};

var getDetails = async (id) => {
	console.log(`READ PROPERTY ${id}`);
	var res = await query(`SELECT * FROM properties WHERE id = ${id};`);
	return res;
};

var getPhotos = async (id) => {
	console.log(`READ PHOTOS ${id}`);
	var res = await query(`SELECT * FROM photos WHERE property_id = ${id};`);
	return res;
};

var createProperty = async (obj) => {
	console.log(`CREATE PROPERTY ${obj.id}`, obj);
	var res = await query(`
		INSERT INTO properties 
		(id, bath_count, bed_count, name, price, sq_ft) 
		VALUES (${obj.id}, ${obj.bath_count}, ${obj.bed_count}, '${obj.name}', ${obj.price}, ${obj.sq_ft})
		ON CONFLICT DO NOTHING;
	`);
	return res;
};

var updateProperty = async (obj) => {
	console.log(`UPDATE PROPERTY ${obj.id}`);
	var res = await query(`
		UPDATE properties
		SET (bath_count, bed_count, name, price, sq_ft) =
		(${obj.bath_count}, ${obj.bed_count}, '${obj.name}', ${obj.price}, ${obj.sq_ft})
		WHERE id = ${obj.id};
	`);
	return res;
};

var deleteProperty = async (id) => {
	console.log(`DELETE PROPERTY ${id}`);
	var res = await query(`DELETE FROM properties WHERE id = ${id};`);
	return res;
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

// var CRUD = async (id) => {
// 	await getDetails(id);
// 	await getPhotos(id);
// 	await createProperty(id);
// 	await updateProperty(id);
// 	await deleteProperty(id);
// };

// const ids = [0, ~~(10e6 / 2), 10e6 - 1];

// (async () => {
// 	console.log('POSTGRES CRUD TEST');
// 	for (let i = 0; i < ids.length; i++) {
// 		await CRUD(ids[i]);
// 		console.log('=============');
// 	}
// 	new Pool(pgConfig).end(() => {
// 		console.log('POSTGRES CLIENT SHUTDOWN');
// 		process.exit();
// 	})
// })();

module.exports = { 
	pgHandler, 
	getDetails, 
	getPhotos, 
	createProperty, 
	updateProperty, 
	deleteProperty 
};