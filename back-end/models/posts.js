'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var Schema = mongoose.Schema;
var PostSchema = Schema({
	titular: { type: Schema.Types.ObjectId},
	cuerpo: String,
	imagen: String,
	comentario: String
});

module.exports = mongoose.model('Post' , PostSchema);