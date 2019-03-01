const db = require('../database');

module.exports = {
	postRoute: (req, res) => {
		db.postDetails(req.body)
			.then(res => res.status(201).send(res))
			.catch(err => res.status(400).send(err))
	},
	putRoute: (req, res) => {
		db.editDetails(req.params.propertyId, req.body)
			.then(res => res.status(204).send(res))
			.catch(err => res.status(400).send(err))
	},
	deleteRoute: (req, res) => {
		db.deleteProperty(req.params.propertyId)
			.then(res => res.status(204).send(res))
			.catch(err => res.status(400).send(err))
	},
};