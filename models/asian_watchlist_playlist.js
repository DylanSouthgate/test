const mongoose = require('mongoose');

const watchlist_playlistSchema = new mongoose.Schema({
	playlistId: { type: mongoose.Schema.Types.ObjectId, ref: 'watchlist' },
    asianShow : { type: String},
    name : { type: String},
    image : { type: String}
}
);

const watchlist_playlist = mongoose.model('watchlist_playlist', watchlist_playlistSchema, 'watchlist_playlist');

module.exports = watchlist_playlist;