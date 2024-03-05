const axios = require('axios');
const cheerio = require('cheerio');
const watchlist_playlist = require('../models/asian_watchlist_playlist');

module.exports = async(req, res) => {
    console.log(req.query)

    try{
        let user = await watchlist_playlist.find({
            "playlistId" : req.query.id
            });
        res.send(user);
        console.log(user)
    }
    catch (error)
    {
        console.error(error);
    }
}