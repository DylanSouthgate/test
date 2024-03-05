const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    const authHeader = req.headers['authorization'];
    try {
        const genre = req.query.genre;
        let link = '';

        if (genre === "popular") {
            link = 'https://www.watchasian.sk/most-popular-drama?page=' + req.query.page;
        } else {
            link = `https://www.watchasian.sk/genre/${genre}.html`;
        }

        console.log(link);

        const response = await axios.get(link);
        const $ = cheerio.load(response.data);
        
        // Extract search data
        const searchData = $('.list-episode-item > li').map((i, el) => {
            const $el = $(el);
            const title = $el.find('a').attr('title');
            const href = $el.find('a').attr('href');
            const image = $el.find('a img').attr('data-original');
            return { href, title, image };
        }).get();

        const pagination = $('.pagination > li').map((i, el) => {
            const $el = $(el);
            const number = $el.find('a').text();
            return { number };
        }).get();


        res.send({searchData,pagination});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
};