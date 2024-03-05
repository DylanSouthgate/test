const axios = require('axios');
const cheerio = require('cheerio');
const watchlist_playlist = require('../models/asian_watchlist_playlist');

module.exports = async(req, res) => {
    playlist_id = req.body.id;
    link = req.body.link;

    const existingDoc = await watchlist_playlist.findOne({
        playlistId: playlist_id,
	    asianShow: link
    });
    if (!existingDoc) {
        let data = {
            playlistId: playlist_id,
            asianShow: link,
            image : req.body.image,
            name : req.body.name
        }
        const newDoc = new watchlist_playlist(data);
        await newDoc.save();
        res.status(200).send({message: "Inserted Asian Show"});
        console.log(newDoc);
    } else {
        console.log("Duplicate document found. Not saving.");
        console.log(existingDoc);
        res.status(200).send({message: "Duplicate document found. Not saving."});
    }
}