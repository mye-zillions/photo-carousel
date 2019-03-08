const faker = require('faker');

const powerCurve = max => {
	var rand = Math.random() * 3;
	var point = ~~(max * Math.exp(-rand / 10));
	return point;
};

const generateAmmo = (context, events, done) => {
	context.vars.id = powerCurve(1e7); // ~~(Math.random() * 1e7); // uniform distribution
	context.vars.name = faker.address.streetAddress();
	context.vars.price = ~~(Math.random() * (30000000 - 500000) + 500000);
	context.vars.bed_count = ~~(Math.random() * (30 - 2) + 2);
	context.vars.bath_count = ~~(Math.random() * (7 - 1) + 1);
	context.vars.sq_ft = ~~(Math.random() * (30000 - 1000) + 1000);
	return done();
};

const generateId = (context, events, done) => {
	context.vars.randomId = powerCurve(1e7); // ~~(Math.random() * 1e7); // uniform distribution
	return done();
};

module.exports = { generateAmmo, generateId };

