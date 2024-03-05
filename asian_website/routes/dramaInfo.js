const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    try {
        console.log("https://www.watchasian.sk" + req.query.q);
        const query = req.query.q;
        const response = await axios.get("https://www.watchasian.sk" + req.query.q);
        const $ = cheerio.load(response.data);
        
        // Extract actor data
        const actorData = $('.item').map((i, el) => {
            const $el = $(el);
            const title = $el.find('a').attr('title');
            const href = $el.find('a').attr('href');
            const image = $el.find('a img').attr('src');
            return { href, title, image };
        }).get();

        // Extract info
        const info = $('.info p').map((index, imgElement) => {
            const string = $(imgElement).html().replace(/\s+/g, ' ').replace(/\r?\n|\r/g, '');
            return string ? string : null;
        }).get().filter(Boolean);

        // Extract YouTube trailer URL
        const youtubeTrailer = $('.trailer > iframe').attr('src');

        const dramaImage = $('.details > .img > img').attr('src');

        const dramaTitle = $('.info > h1').text();

        res.send({ actorData, info, youtubeTrailer,dramaImage,dramaTitle});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
};