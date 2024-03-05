const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    try {
        console.log("https://www.watchasian.sk" + req.query.q);
        const response = await axios.get("https://www.watchasian.sk" + req.query.q);
        const $ = cheerio.load(response.data);

        // Extract info
        const info = $('.info p').map((index, imgElement) => {
            const string = $(imgElement).html().replace(/\s+/g, ' ').replace(/\r?\n|\r/g, '');
            return string ? string : null;
        }).get().filter(Boolean);

        const dramaImage = $('.details > .img > img').attr('src');

        const dramaTitle = $('.info > h1').text();

        const actorDramas = $('.list-episode-item > li').map((i, el) => {
            const $el = $(el);
            const title = $el.find('a > h3').text();
            const href = $el.find('a').attr('href');
            const image = $el.find('a img').attr('data-original');
            return { href, title, image };
        }).get();

        res.send({info,dramaImage,dramaTitle,actorDramas});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
};