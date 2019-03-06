const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ 
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'xillow'
});

var connect = async () => {
	await client.connect()
		.catch(err => { 
			console.error('CONNECTION ERROR');
			throw err;
		})
};

var query = async (query) => {
	await connect();

	var begin = Date.now();

	return new Promise((resolve, reject) => {
		client.execute(query)
			.then(res => {
				console.log(Date.now() - begin);
				resolve(res)
			})
			.catch(err => reject(err))
	});	
};

// RELIC WITH TRACEID METHOD
// var getDetails = async (id) => {
// 	await connect();

// 	var results;

// 	return new Promise((resolve, reject) => {
// 		client.execute('SELECT * FROM properties WHERE id = ?', [id], { prepare: true, traceQuery: true })
// 			.then(res => {
// 				results = res;
// 				return client.metadata.getTrace(res.info.traceId);
// 			})
// 			.then(time => console.log(`READ PROPERTY ${id}:`, time.duration))
// 			.then(() => resolve(results))
// 			.catch(err => reject(err))
// 	});
// };

var getDetails = async (id) => {
	console.log(`READ PROPERTY ${id}`);
	await query(`SELECT * FROM properties WHERE id = ${id};`);	
};

var getPhotos = async (id) => {
	console.log(`READ PHOTOS ${id}`);
	await query(`SELECT * FROM photos_by_property WHERE property_id = ${id};`);
};

var createProperty = async (id) => {
	console.log(`CREATE PROPERTY ${id}`);
	await query(`
		INSERT INTO properties 
		(id, bath_count, bed_count, name, price, sq_ft) 
		VALUES (${id}, 5, 4, 'FAKE PROPERTY', 666, 704);
	`);
};

var updateProperty = async (id) => {
	console.log(`UPDATE PROPERTY ${id}`);
	await query(`
		UPDATE properties
		SET sq_ft = 0
		WHERE id = ${id};
	`);
};

var deleteProperty = async (id) => {
	console.log(`DELETE PROPERTY ${id}`);
	await query(`DELETE FROM properties WHERE id = ${id};`);
};

var CRUD = async (id) => {
	await getDetails(id);
	await getPhotos(id);
	await createProperty(id);
	await updateProperty(id);
	await deleteProperty(id);
};

const ids = [0, ~~(10e6 / 2), 10e6 - 1];

(async () => {
	console.log('CASSANDRA CRUD TEST');
	for (let i = 0; i < ids.length; i++) {
		await CRUD(ids[i]);
		console.log('=============');
	}
	client.shutdown(() => console.log('CASSANDRA CLIENT SHUTDOWN'));
})();

module.exports = { getDetails, getPhotos, createProperty, updateProperty, deleteProperty };

// CREATE TABLE xillow.properties (
// 	id int,
// 	name text,
// 	price int,
// 	bed_count int,
// 	bath_count int,
// 	sq_ft int,
// 	PRIMARY KEY (id)
// );
// CREATE TABLE photos_by_property (
// 	id int,
// 	property_id int,
// 	url text,
// 	PRIMARY KEY (property_id, id)
// );
// COPY properties (id, name, price, bed_count, bath_count, sq_ft) FROM 'C:\Users\alpha\Desktop\System Design Capstone\photo-carousel\properties.csv' WITH HEADER = FALSE;
// COPY photos (id, property_id, url) FROM 'C:\Users\alpha\Desktop\System Design Capstone\photo-carousel\photos.csv' WITH HEADER = FALSE;

// CREATE TABLE xillow.properties_with_photos (
//   id int PRIMARY KEY,
//   bath_count int,
//   bed_count int,
//   name text,
//   photos set<int>,
//   price int,
//   sq_ft int
// );
// INSERT INTO properties_with_photos (id, bath_count, bed_count, name, photos, price, sq_ft)
// VALUES (1, 1, 1, 'Here And Now', {5, 6, 7, 8}, 1, 1);
// COPY properties_with_photos (id,name,price,bed_count,bath_count,sq_ft,photos) 
// FROM 'C:\Users\alpha\Desktop\System Design Capstone\photo-carousel\properties_with_photos.csv'  
// WITH HEADER = TRUE AND DELIMITER = '|';