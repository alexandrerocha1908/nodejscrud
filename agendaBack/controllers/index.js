var express = require('express');
var router = express.Router();

var Person = require('../models/person')

router.route('/api/persons')
	.get(function(req, res, next){
		var data = Person.all();
		console.log(data);
			// .then(function(data){
			// 	console.log(data);
			// 	res.status(200)
	  // 				.json({
	  // 					status: 'success',
	  // 					data: data.rows,
	  // 					message: 'All persons'
	  // 				});
	  // 		});
		
	})
	.post(function(req, res, next){
		var person = req.body;
		Person.create(person.name, person.birth, person.email, person.phone, person.address, function (err, person){
			if(!err){
				res.status(200)
	  				.json({
	  					status: 'success',
	  					message: 'Person Inserted'
	  				});
			}
		});
	});
	

module.exports = router