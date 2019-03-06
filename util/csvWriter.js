const path = require('path');
const fs = require('fs');
const faker = require('faker');

const PHOTO_CHUNK_SIZE = 20;

var generatePhoto = (property_id, photo_id) => {
	return (PHOTO_CHUNK_SIZE * property_id + photo_id) % 1000;
};

var generateDetail = (property_id) => {
	return {
		id: property_id,
	  name: faker.address.streetAddress(),
	  price: ~~(Math.random() * (30000000 - 500000) + 500000),
	  bed_count: ~~(Math.random() * (30 - 2) + 2),
	  bath_count: ~~(Math.random() * (7 - 1) + 1),
	  sq_ft: ~~(Math.random() * (30000 - 1000) + 1000),
	};	
};

var toCsv = obj => Object.keys(obj).map(key => obj[key]).join('|');

var streamToPromise = (stream, chunk) => {
	return new Promise((resolve, reject) => {
		stream.write(chunk, () => {
			resolve();
		});
	});
};

const writeToCsv = async (num = 1) => {
	var writeStream = fs.createWriteStream('properties_with_photos.csv', { flags: 'w' });

	return new Promise((resolve, reject) => {
		writeStream.on('finish', () => {
			console.log(`WROTE ${num} RECORDS!`);
			resolve();
		});

		writeStream.on('error', (err) => {
			reject(err);
		});

		(async () => {
			await streamToPromise(writeStream, 'id|name|price|bed_count|bath_count|sq_ft|photos\n');
			for (let id = 0; id < num; id++) {
				var line = '', url_id = [];
				if (id % 1e5 === 0) console.log(`BATCH ${~~(id / 1e5)} DONE`);
				for (let photo_id = 0; photo_id < PHOTO_CHUNK_SIZE; photo_id++) {
					url_id.push(generatePhoto(id, photo_id));				
				}
				await streamToPromise(writeStream, toCsv(generateDetail(id)).concat('|{', url_id.join(','), '}\n'));	
			}
			writeStream.end();
		})();

	});
};

module.exports = writeToCsv;