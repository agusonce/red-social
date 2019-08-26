'use strict'
var mongoose = require('mongoose');
var app= require("./app");
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/red-social')
	.then(() => {
		console.log('++++++se conecto a la base  de datos  sastifactoriamente...');

		//creando servidor
		app.listen(port, () => {
			console.log("++++++servidor iniciado");
		});
	})
	.catch(err => console.log(err));