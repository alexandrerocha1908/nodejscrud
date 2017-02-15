var pg = require('pg');

var connect = "postgres://postgres@localhost/tokenlab"

exports.all = function() {
	pg.connect(connect, function(err, client, done){
		if (err) throw err;

		client.query('SELECT * FROM person;', function(err, data){
			// console.log(data);
			return data;
		});
		// 	.then(function(data){
		// 		return data;

		// 	client.end();	
		// });
	});
};

exports.create = function(name, birth, email, phone, address, cb) {
	person = [name, birth, email, phone, address];
	console.log(person)
	pg.connect(connect, function(err, client){
		if (err) throw err;
		
		client.query('INSERT INTO person (name, birth, email, phone, address) VALUES ($1, $2, $3, $4, $5);', person, function(err, result){
			if (err) throw err;	

			client.end(function (err) {
				if (err) throw err;
			});
		});
  });
};