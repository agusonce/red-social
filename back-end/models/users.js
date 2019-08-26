'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var Schema = mongoose.Schema;
var UserSchema = Schema({
	name: String,
	apellido: String,
	user: String,
	pass: String,
	imagen: String
});

module.exports = mongoose.model('Users' , UserSchema);