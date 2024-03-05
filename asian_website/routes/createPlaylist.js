const axios = require('axios');
const cheerio = require('cheerio');
const watchlist = require('../models/asian_watchlist');

module.exports = async(req, res) => {
    const existingDoc = await watchlist.findOne({name : req.body.name,"userId" : req.body.id});
    if (!existingDoc) {
        let data = {
            name : req.body.name,
            userId : req.body.id
        }
        const newDoc = new watchlist(data);
        await newDoc.save();
        console.log("Playlist Created.");
        res.status(200).send({message: "Playlist Created."});
    } else {
        console.log("Duplicate document found. Not saving.");
        res.status(200).send({message: "Duplicate document found. Not saving."});
    }
}