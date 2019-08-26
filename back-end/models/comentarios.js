'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var Schema = mongoose.Schema;
var ComentarioSchema = Schema({
	titular:{ type: Schema.Types.ObjectId},
	post: String,
	comentario: String
});

module.exports = mongoose.model('Comentario' , ComentarioSchema);