const axios = require('axios');
const cheerio = require('cheerio');
const watchlist = require('../models/asian_watchlist');;

module.exports = async(req, res) => {
    let userid = req.query.id;
    console.log("dejkbdekjwbjew");
    try{
        let user = await watchlist.find({
            "userId" : userid
            });
        res.send(user);
    }
    catch (error)
    {
        console.error(error);
    }
}