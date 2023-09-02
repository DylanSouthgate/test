const express = require('express')
const ytdl = require('ytdl-core');
const app = express()
const port = process.env.PORT || 3000

app.get('/', async(req, res) => {
  res.send("Hello World!");
})

app.get('/music', async(req, res) => {
  try
  {
    if (req.query.link.includes('watch'))
    {
      let videoID = req.query.link;
      let info = await ytdl.getInfo(videoID);
      let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
			console.log(audioFormats[0].url);
			const remoteURL = audioFormats[0].url;
			const data = { message:  remoteURL};
			res.json(data);
		}
		else
		{
			res.send('boom')
		}
	}catch(error)
	{
		console.log(error)
	}
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})