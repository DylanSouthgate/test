const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    try {
        const query = req.query.q;
        const page = req.query.page;
        const response = await axios.get(`https://www.watchasian.sk/search?keyword=${query}&type=movies&page=${page}`, {
            headers: {
                accept: "application/json, text/javascript, */*; q=0.01"
            }
        });
        const $ = cheerio.load(response.data);
        
        // Extract search data
        const searchData = $('.list-episode-item > li').map((i, el) => {
            const $el = $(el);
            const title = $el.find('a > h3').text();
            const href = $el.find('a').attr('href');
            const image = $el.find('a img').attr('data-original');
            return { href, title, image };
        }).get();

        const pagination = $('.pagination > li').map((i, el) => {
            const $el = $(el);
            const number = $el.find('a').text();
            return { number };
        }).get();

        console.log(pagination);

        res.send({searchData,pagination});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
};