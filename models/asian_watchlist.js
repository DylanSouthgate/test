const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	name: { type: String}
}
);

const watchlist = mongoose.model('watchlist', watchlistSchema, 'watchlist');

module.exports = watchlist;