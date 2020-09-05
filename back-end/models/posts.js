'use strict'

var mongoose = require('mongoose');
var LikeSchema = require('../models/like').schema;

mongoose.set('useFindAndModify', false);

var Schema = mongoose.Schema;
var PostSchema = Schema({
	titular: { type: Schema.Types.ObjectId},
	cuerpo: String,
	imagen: String,
	comentario: String,
	likes: [LikeSchema]
});

module.exports = mongoose.model('Post' , PostSchema);