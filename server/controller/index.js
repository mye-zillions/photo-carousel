const db = require('../../util/pgHandler.js');

module.exports = {
	getPropertyRoute: (req, res) => {
	  db.getDetails(req.params.propertyId)
	    .then((details) => {
	      res.set('Access-Control-Allow-Origin', '*');
	      res.status(200).send(details);
	    })
	    .catch((error) => {
	    	console.log('GET PROPERTY ERROR:', error)
	      res.status(400).send(error); // i'm a teapot
	    });
	},
	getPhotoRoute: (req, res) => {
	  db.getPhotos(req.params.propertyId)
	    .then((links) => {
	      res.set('Access-Control-Allow-Origin', '*');
	      res.status(200).send(links);
	    })
	    .catch((error) => {
	      res.status(401).send(error);
	    });
	},
	postRoute: (req, res) => {
		db.createProperty(req.body)
			.then(results => {
      	res.set('Access-Control-Allow-Origin', '*');
				res.status(201).send(results)
			})
			.catch(err => {
				res.status(402).send(err)
			})
	},
	putRoute: (req, res) => {
		db.updateProperty(req.body)
			.then(results => {
      	res.set('Access-Control-Allow-Origin', '*');
				res.status(204).send(results)
			})
			.catch(err => {
				res.status(403).send(err)
			})
	},
	deleteRoute: (req, res) => {
		db.deleteProperty(req.params.propertyId)
			.then(results => {
      	res.set('Access-Control-Allow-Origin', '*');
				res.status(204).send(results)
			})
			.catch(err => {
				res.status(404).send(err)
			})
	},
};