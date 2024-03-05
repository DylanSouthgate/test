const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    try {
        const response = await axios.get("https://www.watchasian.sk/");
        const $ = cheerio.load(response.data);
        
        // Extract trending data
        const trendingData = $('.ls-slide').map((i, el) => {
            const $el = $(el);
            const src = $el.find('img').attr('src');
            const title = $el.find('img').attr('title');
            return { src, title };
        }).get();

        res.send(trendingData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
};