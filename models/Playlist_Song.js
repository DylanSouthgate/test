const mongoose = require('mongoose');

const playlist_songSchema = new mongoose.Schema({
	playlistId: { type: mongoose.Schema.Types.ObjectId, ref: 'playlist' },
	songId: { type: mongoose.Schema.Types.ObjectId, ref: 'song' }
}
);

const Playlist_Song = mongoose.model('playlist_song', playlist_songSchema, 'playlist_song');

module.exports = Playlist_Song;