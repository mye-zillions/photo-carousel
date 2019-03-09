require('newrelic');

const morgan = require('morgan');
const express = require('express');
const compression = require('compression');
const path = require('path');
const { port } = require('../config.js');

var router = require('./controller');
var parser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(compression());
app.get('/loaderio-4eccb6a1aafe98ecbf7ecf06a2bd36d6/', (req, res) => {
res.sendFile(path.join(__dirname, '../loader.config.js'));
});
// app.use(express.static('public'));
app.use('/dist', express.static('public/dist'));
app.use('/:propertyId', express.static('public'));

app.get('/api/property/:propertyId', router.getPropertyRoute);

app.get('/api/photo/:propertyId', router.getPhotoRoute);

app.post('/api/property/', parser.json(), router.postRoute);

app.put('/api/property/', parser.json(), router.putRoute);

app.delete('/api/property/:propertyId', router.deleteRoute);

app.listen(port, () => {
  console.log(`Express listening at port ${port}`);
});
