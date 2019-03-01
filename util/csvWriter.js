const path = require('path');
const fs = require('fs');
const faker = require('faker');
const csv = require('fast-csv');

const PHOTO_CHUNK_SIZE = 20;

var generatePhoto = (property_id, photo_id) => {
	var rounded_photo_id = (PHOTO_CHUNK_SIZE * property_id + photo_id) % 1000;
	return {
		photo_id: PHOTO_CHUNK_SIZE * property_id + photo_id, 
		property_id: property_id,
		url: `https://s3.amazonaws.com/xillow-photos/${rounded_photo_id}.jpg`,
	};
};

var generateDetail = (property_id) => {
	return {
		id: property_id,
	  name: faker.address.streetAddress(),
	  price: faker.random.number({
	    min: 500000,
	    max: 30000000,
	  }),
	  bed_count: faker.random.number({
	    min: 2,
	    max: 30,
	  }),
	  bath_count: faker.random.number({
	    min: 1,
	    max: 7,
	  }),
	  sq_ft: faker.random.number({
	    min: 1000,
	    max: 30000,
	  }),
	};	
};

var toCsv = obj => Object.keys(obj).map(key => obj[key]).join(',').concat('\n');

var streamToPromise = (stream, chunk) => {
	return new Promise((resolve, reject) => {
		stream.write(chunk, () => {
			resolve();
		});
	});
};

const writeToCsv = async (num = 1) => {
	var propertiesStream = fs.createWriteStream('properties.csv', { flags: 'w' }),
			photosStream = fs.createWriteStream('photos.csv', { flags: 'w' });

	return new Promise((resolve, reject) => {
		propertiesStream.on('finish', () => {
			console.log(`WROTE ${num} RECORDS!`);
			resolve();
		});

		propertiesStream.on('error', (err) => {
			reject(err);
		});

		(async () => {
			for (let id = 0; id < num; id++) {
				if (id % 1e5 === 0) console.log(`BATCH ${~~(id / 1e5)} DONE`);
				await streamToPromise(propertiesStream, toCsv(generateDetail(id)));	
				for (let photo_id = 0; photo_id < PHOTO_CHUNK_SIZE; photo_id++) {
					await streamToPromise(photosStream, toCsv(generatePhoto(id, photo_id)));				
				}
			}
			propertiesStream.end();
		})();

	});
};

module.exports = writeToCsv;