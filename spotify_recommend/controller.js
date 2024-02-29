const axios = require('axios');
const cheerio = require('cheerio');

module.exports.home = async (req, res) => {
    const authHeader = req.headers['authorization'];
    try {
        res.send("spotify");
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
};

module.exports.search = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const query = req.query.q;
    if (query)
    {
        try
        {
            ///v1/catalog/za/search?limit=5&term=lil+wayne+3+peat&types=songs
            const response = await axios.get("https://www.shazam.com/services/amapi/v1/catalog/za/search?limit=12&term=" + query + "&types=songs");
            console.log(JSON.parse(JSON.stringify(response.data.results.songs)));
            res.send(JSON.parse(JSON.stringify(response.data.results.songs)));
        } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
        }
    }
    else{
        res.status(500).send({ error: 'No Query!' });
    }
};

module.exports.similar = async (req, res) => {
    try {
      const apiUrl = await axios.get('https://www.shazam.com/services/song/v1/en-US/ZA/web/shazam-songs?adamId=' + req.query.id);

      const similar_info = await axios.get("https://www.shazam.com/shazam/v3/en-US/ZA/web/-/tracks/track-similarities-id-"+apiUrl.data['data'][0]['id']+"?startFrom=0&pageSize=20&connected=");

      const id = apiUrl.data['data'][0]['id'];

      console.log(apiUrl.data['data'][0]['id']);
      let songInfo = apiUrl.data.resources['shazam-songs'][apiUrl.data['data'][0]['id']];
      let songSimilar = similar_info.data;
      
      res.send({songInfo,songSimilar,id});
    } catch (error) {
      console.error('Error fetching data from the API:', error.message);
      res.status(500).send('Internal Server Error');
    }
};

module.exports.info = async (req, res) => {
    try {
      const info = await axios.get('https://www.shazam.com/services/song/v1/en-US/ZA/web/shazam-songs?adamId=' + req.query.id);
      
      res.send(JSON.stringify(info.data));
    } catch (error) {
      console.error('Error fetching data from the API:', error.message);
      res.status(500).send('Internal Server Error');
    }
};