require('newrelic');

const morgan = require('morgan');
const express = require('express');
const compression = require('compression');
const { port } = require('../config.js');

var router = require('./controller');
var parser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(express.static('public'));
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
