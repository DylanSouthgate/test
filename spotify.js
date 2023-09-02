const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: { type: String},
	youtube: { type: String},
	playlist_name: { type: String},
	artist : [ {url : {type: String}, name : { type: String}}],
	album : { type: String},
	release_date : { type: String},
	isrc :{ type: String},
	key :{ type: String},
	tempo :{ type: String},
	loadness :{ type: String},
	length :{ type: String},
	track_number :{ type: String},
	explicit :{ type: String},
	yt_id :{ type: String}
}
);

const Spotify = mongoose.model('spotify', userSchema, 'spotify');

module.exports = Spotify;