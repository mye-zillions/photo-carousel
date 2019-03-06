const axios = require('axios');
const path = require('path');
const fs = require('fs');

var writeToCsv = require('./csvWriter.js');
// var { pgHandler } = require('./pgHandler.js');	

// generate data and write to csv
var volume = 1e7;
var tracker = new Date();
writeToCsv(volume) // CAUTION WITH STREAM VOLUME
	.then(() => {
		console.log('TIME ELAPSED:', new Date() - tracker);
		// postgres adapter
		// pgHandler();
	})
	.catch(err => console.error(err))

// download photos
const keywords = ['house', 'cabin', 'mansion', 'tent', 'skyscraper', 'city'];
var download = async (i) => {
	var width = 640, height = 480, keyword = keywords[~~(Math.random() * keywords.length)];
	var url = `https://loremflickr.com/${width}/${height}/${keyword}`;
	var response = await axios.get(url, { responseType: 'stream' });
	var filepath = path.resolve(__dirname, '..', 'img', `${i}.jpg`);
	var writer = fs.createWriteStream(filepath);

	response.data.pipe(writer);

	return new Promise((resolve, reject) => {
		writer.on('finish', resolve);
		writer.on('error', reject);
	});
};