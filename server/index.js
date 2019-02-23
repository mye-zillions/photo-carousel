const morgan = require('morgan');
const express = require('express');
const compression = require('compression');
const db = require('./database');
const { servicePort } = require('../config.js');

const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use('/dist', express.static('public/dist'));
app.use('/:propertyId', express.static('public'));

app.get('/api/basicdetails/:propertyId', (req, res) => {
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

app.get('/api/thumb/photos/:propertyId', (req, res) => {
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

app.get('/api/full/photos/:propertyId', (req, res) => {
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
