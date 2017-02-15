var express = require('express');
var router = express.Router();
var pg = require('pg');
var jwt = require("jsonwebtoken");

var connect = "postgres://postgres@localhost/tokenlab"

router.route('/api/create-user')
	.post(function(req, res, next){
		var user = req.body;
		console.log(user);
		// try{
			pg.connect(connect, function(err, client, done){
				client.query('INSERT INTO contactuser (username, password, email) VALUES ($1, $2, $3);', [user.username, user.password, user.email], function(err, result){
					if (err)
						next(err, 'Teste');

					client.end();
				})
				.then(function(data){
					console.log(data);
					res.status(200)
						.json({
							status: 'success',
							message: 'User Created'
						});
				})
				.catch(function(err){
		  			console.log(err);
		  		})
			});
	});

router.route('/api/user/')
	.post(function(req, res, next){
		var user = req.body;
		pg.connect(connect, function(err, client, done){
			client.query('SELECT * FROM contactuser WHERE username=$1 AND password=$2;', [user.username, user.password])
			.then(function(data){
				console.log(data);
				if(data.rowCount===1){
					var token = jwt.sign(user, "secret", {
						expiresInMinutes: 1440
					});
					res.status(200)
						.json({
							status:'success',
							message: 'User has Login',
							token: token
						});
				}
				else{
					res.status(404)
						.json({
							status: 'not found',
							message: 'Login or password not found'
						})
				}
			});
		});
	});

module.exports = router;
