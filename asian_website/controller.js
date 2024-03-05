const axios = require('axios');
const cheerio = require('cheerio');
//process.env.ASIAN
// controller actions
module.exports.homepage_get = async (req, res) => {
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

module.exports.search = async (req, res) => {
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
//https://www.watchasian.sk/star/park-ji-hyun
module.exports.actorInfo = async (req, res) => {
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
