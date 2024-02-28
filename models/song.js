const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
	title: { type: String},
	name: { type: String},
	url: { type: String},
	image : { type: String}
}
);

const Song = mongoose.model('song', songSchema, 'song');

module.exports = Song;