const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	name: { type: String}
}
);

const Playlist = mongoose.model('playlist', playlistSchema, 'playlist');

module.exports = Playlist;