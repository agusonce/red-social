'use strict'
var User= require('../models/users');
var fs = require('fs');
var path = require('path');
var controller = {
		home: function(req, res){
			return res.status(200).send({
			  message:'hola home'	
			});
		},

		test: function(req, res){
			return res.status(200).send({
				message:'hola test 213'
			});
		},
		getUsers: function(req,res){
		
			User.find({}).exec((err, users) => {

				if(err) return res.status(500).send({message: 'erro al devolver losdatos'});

				if(!users) return res.status(404).send({message: 'no hay ningun proyecto que mostrar'});

				return res.status(200).send({users});

			});
		},
		getUser: function(req, res){
			var usuario = req.body.user;
			var password = req.body.pass;
			console.log("user: ",req.body.user);
			console.log("pass: ",req.body.pass);
			console.log(req.body);
			User.find({'user' : usuario, 'pass' : password}).exec((err, user) => {
				console.log(user);
				if(err) return res.status(500).send({message: 'erro al devolver losdatos'});

				if(!user) return res.status(404).send({message: 'no hay ningun proyecto que mostrar'});

				return res.status(200).send({user});

			});

		},
		getDataUser: function(req, res){
			var Id = req.body.id;
			console.log("pass: ",req.body.Id);
			console.log(req.body);
			User.find({'_id' : Id}).exec((err, user) => {
				console.log(user);
				if(err) return res.status(500).send({message: 'erro al devolver losdatos'});

				if(!user) return res.status(404).send({message: 'no hay ningun proyecto que mostrar'});

				return res.status(200).send({user});

			});

		},
		saveUser: function(req, res){
			var user = new User;
			var params = req.body;
			console.log(params);

			user.name = params.name;
			user.pass = params.pass;
			user.user = params.user;
			user.apellido = params.apellido;
			user.imagen = null;


			user.save((err, userStored) => {
				if (err) return res.status(500).send({message: 'error al guardar'});
		
				if (!userStored) return res.status(404).send({message: 'no se ah podido guardar'});

				return res.status(200).send({user: userStored});

			});

		},
		updateUser: function(req, res){
			var userId = req.params.id;
			var update = req.body;
			console.log(userId);
			console.log(update);
			User.findOneAndUpdate(userId, update, {new:true}, (err, userUpdate) => {
				if (err) return res.status(500).send({message:'error 500'});

				if (!userUpdate) return res.status(404).send({message:'no existe el usuario'});

			 return res.status(200).send({user: userUpdate});

			});
		},
		deleteUser: function(req,res){
			var userId = req.params.id;

			User.findByIdAndRemove(userId, (err, userRemove) => {
				if(err) return res.status(500).send({message:'no se ha pedido eliminar el usuario'});
			
				if (!userRemove) return res.status(404).send({message:'no existe el usuario '});

			 	return res.status(200).send({user:userRemove});


			});
		},

		uploadImg: function(req, res){
			var userId = req.params.id;
			var fileName = 'imagen no subida';

			if (req.files) {

				var filePath = req.files.image.path;
				var fileSplit = filePath.split('\\');
				var fileName = fileSplit[1];  
				var extSplit = fileName.split('\.');
				var fileExt = extSplit[1];

				if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg') {
					User.findByIdAndUpdate(userId, {imagen: fileName}, {new:true}, (err, userUpdate) => {
						if (err) return res.status(500).send({message:'la imagen no se subio'});

						if (!userUpdate) return res.status(404).send({message:'no existe el proyecto..'});

						return res.status(200).send({
							user: userUpdate
						});

					});

				}else{
					fs.unlink(filePath, (err) => {
						return res.status(200).send({message: 'La extencion no es valida'});
					});
				}

			}else{
				return res.status(200).send({
					message: 'imagen no subida'
				});
			}
			

		},

		getImageFile: function(req, res){
			var file = req.params.image;
			var path_file = './uploads/'+file;

			fs.exists(path_file, (exists) =>{
				if (exists) {
					console.log('existe');
					return res.sendFile(path.resolve(path_file));
				}else{
					return res.status(200).send({message:'--No existe la imagen...'});
				}
			});
		}


};

module.exports = controller;



