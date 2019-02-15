const axios = require('axios');
const path = require('path');
const fs = require('fs');

const keywords = ['house', 'cabin', 'mansion'];

async function downloadImage(params) {
  const { width, height, keyword, imageName } = params;
  const url = `https://loremflickr.com/${width}/${height}/${keyword}`;
  const filepath = path.resolve(__dirname, '..', 'images', imageName);
  const writer = fs.createWriteStream(filepath);

  const response = await axios.get(url, {
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

for (let i = 0; i < 100; i += 1) {
  const params = {
    width: 640,
    height: 480,
    keyword: keywords[Math.floor(Math.random() * keywords.length)],
    imageName: `large${i + 1}.jpg`,
  };
  downloadImage(params)
    .catch((error) => {
      console.log(error);
    });
}
