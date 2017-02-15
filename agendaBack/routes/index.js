var express = require('express');
var router = express.Router();
var pg = require('pg');
var jwt = require("jsonwebtoken");

var connect = "postgres://postgres@localhost/tokenlab"

router.use(function(request, response, next) {
    var token = request.body.token || request.query.token || request.headers['Authorization'];

    if(token) {
        jwt.verify(token, 'secret', function(error, decoded) {
            if(error) {
                return response.json( {
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                request.decoded = decoded;
                DBUser.get(decoded.id, function(error, result) {
                    if(error) {
                        return response.status(403).json({
                            success: false,
                            message: error
                        });
                    } else {
                        request.user = result;
                        next();
                    }
                });
            }
        });
    } else {
        return response.status(403).json({
            success: false,
            message: 'Token not provided'
        });
    }
});

router.route('/api/persons')
	.get(function(req, res, next) {
	  pg.connect(connect, function(err, client, done){
	  	client.query('SELECT * FROM person ORDER BY id')
	  		.then(function(data){
	  			res.status(200)
	  				.json({
	  					data: data.rows,
	  				});
	  			console.log(data.rows);
	  		})
	  		.catch(function(err){
	  			console.log(err);
	  		});
	  });
	})
	.post(function(req, res, next) {  
	  var person = req.body;
	  console.log(person);
	  pg.connect(connect, function(err, client, done){
	  	client.query('INSERT INTO person (name, birth, email, phone, address) VALUES ($1, $2, $3, $4, $5);', [person.name, person.birth, person.email, person.phone, person.address])
	  		.then(function(){
	  			res.status(200)
	  				.json({
	  					status: 'success',
	  					message: 'Person Inserted'
	  				});
	  		})
	  		.catch(function(err){
	  			console.log(err);
	  		});
	  });
	});

router.route('/api/persons/:id')
	.put(function(req, res, next){
		var person = req.body;
		pg.connect(connect, function(err, client, done){
			client.query('UPDATE person SET name=$1, birth=$2, email=$3, phone=$4, address=$5 WHERE id=$6;', [person.name, person.birth, person.email, person.phone, person.address, req.params.id])
				.then(function(){
					res.status(200)
					.json({
						status: 'success',
						message: 'Person Updated'
					});
				})
				.catch(function(err){
					console.log(err);
				});
		});
	})
	.get(function(req, res, next){
		var personId = parseInt(req.params.id);
		pg.connect(connect, function(err, client, done){
			client.query('SELECT * FROM person WHERE id = $1;', [personId])
				.then(function(data){
					res.status(200)
						.json({
							data: data.rows,
							message: req.params.name
						});
				})
				.catch(function(err){
					return console.log(err);
				});
		});
	})
	.delete(function(req, res, next){
		var personId = parseInt(req.params.id);
		pg.connect(connect, function(err, client, done){
			client.query('DELETE FROM person WHERE id = $1', [personId])
				.then(function(data){
					res.status(200)
						.json({
							status: 'success'
						});
				})
				.catch(function(err){
					return console.log(err);
				});
		});
	});

module.exports = router;
