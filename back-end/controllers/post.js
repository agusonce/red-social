'use strict'
var Post = require('../models/posts');
var Comentario = require('../models/comentarios');
var Like = require('../models/like');
var fs = require('fs');
var path = require('path');
var controller = {
		home: function(req, res){
			return res.status(200).send({
			  message:'hola home'	
			});
		},
		getPosts: function(req,res){
		Post.aggregate([
		{$lookup:{
                            from:'users',
                            localField:'titular',
                            foreignField: '_id',
                            as: 'usuario' }
                        }

			]).exec((err, posts) => {

				if(err) return res.status(500).send({message: 'erro al devolver los datos'});

				if(!posts) return res.status(404).send({message: 'no hay ningun proyecto que mostrar'});

				return res.status(200).send({posts});

			});
			/*Post.find({}).populate('User').exec((err, posts) => {

				if(err) return res.status(500).send({message: 'erro al devolver los datos'});

				if(!posts) return res.status(404).send({message: 'no hay ningun proyecto que mostrar'});

				return res.status(200).send({posts});

			});

			*/
		},
		savePost: function(req, res){
			var post = new Post;
			var params = req.body;
			console.log(params);
			console.log(params.titular);

			post.titular = params.titular;
			post.cuerpo = params.cuerpo;
			post.imagen = null;
			post.comentario = null;


			post.save((err, postStored) => {
				if (err) return res.status(500).send({message: 'error al guardar'});
		
				if (!postStored) return res.status(404).send({message: 'no se ah podido guardar'});

				return res.status(200).send({post: postStored});

			});

		},
		getComentarios: function(req,res){
			var postId = req.params.post;
			console.log(postId);
			Comentario.aggregate([
				{$match: {post: postId }},
				{$lookup:{
                            from:'users',
                            localField:'titular',
                            foreignField: '_id',
                            as: 'usuario' }
                  }		
			]).exec((err, comentarios) => {

				if(err) return res.status(500).send({message: 'erro al devolver los datos'});

				if (!comentarios) return res.status(404).send({message: 'el proyecto no existe'});
				console.log(comentarios)
				return  res.status(200).send({comentarios});

			});

/*	if (postId == null) return res.status(404).send({message:'el proecto no existe'});

			Comentario.find({'post': postId}, (err, comentarios) => {
				console.log(err)
				
				if (err) return res.status(500).send({message: 'error al evolver os datos'});
				console.log(comentarios)
				
				if (!comentarios) return res.status(404).send({message: 'el proyecto no existe'});
				console.log(comentarios)
				return  res.status(200).send({comentarios});
			});
*/
		},
		Testinsert1: function(req,res){			
			var newData = new Like();
			newData.authorId= "5f3aec54cc0e6d2a14eb6913";
			
			Post.findByIdAndUpdate({_id : "5f3aef24cc0e6d2a14eb6915"}, {$push: {"likes" : newData}}, {new:true}, (err, postUpdate) => {
						if (err) return res.status(500).send({message:'la imagen no se subio'});
						console.log(postUpdate);
						if (!postUpdate) return res.status(404).send({message:'no existe el proyecto..'});

						return res.status(200).send({
							post: postUpdate
						});

					});

			
		},
		Testinsert: function(req,res){			
			var newData = new Like();
			newData.authorId= "5f3aef24cc0e6d2a14eb6915";
			
			Post.find({_id : "5f3aef24cc0e6d2a14eb6915" , likes:{ $elemMatch: {authorId:"5f3aec54cc0e6d2a14eb6913"} } }, (err, postUpdate) => {
						console.log(err);
						
						if (err) return res.status(500).send({message:'no match'});
						console.log(postUpdate);
							if (postUpdate.length==0) {
								console.log("no hay nada");
							}else{
								console.log("hay algo");
							}
						
						if (!postUpdate) return res.status(404).send({message:'no existe el proyecto..'});

						console.log(postUpdate);
						console.log(!postUpdate);
						return res.status(200).send({
							post: postUpdate
						});

					});

			
		},
		Testinsert2: function(req,res){			
			var newData = new Like();
			newData.authorId= "5f3aec54cc0e6d2a14eb6913";
			
			Post.update({_id : "5f3aef24cc0e6d2a14eb6915" },{ $pull:{ likes:{ $elemMatch: {authorId:"5f3aec54cc0e6d2a14eb6913"} } }}, (err, postUpdate) => {
						console.log(err);
						
						if (err) return res.status(500).send({message:'no match'});
						console.log(postUpdate);
							if (postUpdate.length==0) {
								console.log("no hay nada");
							}else{
								console.log("hay algo");
							}
						
						if (!postUpdate) return res.status(404).send({message:'no existe el proyecto..'});

						console.log(postUpdate);
						console.log(!postUpdate);
						return res.status(200).send({
							post: postUpdate
						});

					});

			
		},
		Testinsert3: function(req,res){	
			var postId = req.body.postId;
			var userId = req.body.userId;
			console.log("params",req.body);
			console.log("postId",postId);
			console.log("userId",userId);
			Post.find({_id : postId , likes:{ $elemMatch: {authorId : userId } } }, (err, postUpdate) => {
						console.log(err);
						
						if (err) return res.status(500).send({message:'no match'});
						console.log(postUpdate);
							if (postUpdate.length==0) {
									var newData = new Like();
									newData.authorId= userId;
									
									Post.findByIdAndUpdate({_id : postId}, {$push: {"likes" : newData}}, {new:true}, (err, postPush) => {
												if (err) return res.status(500).send({message:'la imagen no se subio'});
												console.log(postPush);
												if (!postPush) return res.status(404).send({message:'no existe el proyecto..'});

												return res.status(200).send({
													post: postPush
												});

											});


								console.log("no hay nada");
							}else{


									console.log("eliminar:");
									console.log("author : ",userId);
									Post.update({_id : postId },{ $pull  :{ likes:  {"authorId": userId} } }, (err, postPull) => {
												console.log(err);
												
												if (err) return res.status(500).send({message:'no match'});
												console.log(postPull);
													if (postPull.length==0) {
														console.log("no hay nada");
													}else{
														console.log("hay algo update");
													}
												
												if (!postPull) return res.status(404).send({message:'no existe el proyecto..'});

												return res.status(200).send({
													post: postPull
												});

											});

								console.log("hay algo fuera");

							}
						
						

						

					});
			
		},
		insertComentarioPost: function(req, res){
			var params = req.body;
			var comentario = new Comentario;

			comentario.post = params.post;
			comentario.titular = params.titular;
			comentario.comentario = params.comentario;

			comentario.save((err, comentarioStored) => {
				if (err) return res.status(500).send({message: 'error al guardar'});
		
				if (!comentarioStored) return res.status(404).send({message: 'no se ah podido guardar'});

				return res.status(200).send({comentario: comentarioStored});

			});


		},
		uploadImgPost: function(req, res){
			var postId = req.params.id;
			var fileName = 'imagen no subida';

				console.log(req.files);

			if (req.files) {
				var filePath = req.files.image.path;
				var fileSplit = filePath.split('\\');
				var fileName = fileSplit[1];  
				var extSplit = fileName.split('\.');
				var fileExt = extSplit[1];

				if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg') {
					Post.findByIdAndUpdate(postId, {imagen: fileName}, {new:true}, (err, postUpdate) => {
						if (err) return res.status(500).send({message:'la imagen no se subio'});

						if (!postUpdate) return res.status(404).send({message:'no existe el proyecto..'});

						return res.status(200).send({
							post: postUpdate
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
			

		}
		/*,
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
		}*/


};

module.exports = controller;



