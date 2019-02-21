const morgan = require('morgan');
const express = require('express');
const db = require('./database');

const app = express();
const port = 80;

app.use(morgan('dev'));
app.use(express.static('public'));

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

app.listen(port);
