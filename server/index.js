const path = require('path');
const morgan = require('morgan');
const express = require('express');
const { renderFile } = require('ejs');
const db = require('./database');
const { servicePort } = require('../config.js');

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.engine('html', renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '..', 'public'));

app.get('/:propertyId', (req, res) => {
  res.render('index.html', { id: req.params.propertyId });
});

app.get('/api/:propertyId/basicdetails', (req, res) => {
  // TODO: Query property database here and return property's basic details
  // propertyId stored in req.params.propertyId
  const propertyId = Number(req.params.propertyId);
  db.getDetails(propertyId)
    .then((details) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).send(details);
    })
    .catch((error) => {
      res.status(418).send(error); // i'm a teapot
    });
});

app.get('/api/photos/:propertyId', (req, res) => {
  // TODO: Query photo database here and return all links pertaining to property
  // propertyId stored in req.params.propertyId
  const propertyId = Number(req.params.propertyId);
  db.getPhotos(propertyId)
    .then((links) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).send(links);
    })
    .catch((error) => {
      res.status(418).send(error);
    });
});

app.listen(servicePort);
