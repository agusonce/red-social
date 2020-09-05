'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var Schema = mongoose.Schema;
var LikeSchema = Schema({
	authorId: { type: Schema.Types.ObjectId}
});

module.exports = mongoose.model('Like' , LikeSchema);