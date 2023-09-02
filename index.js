const express = require('express')
const ytdl = require('ytdl-core');
const app = express()
const ytsr = require('ytsr');
const request = require('request');
const port = process.env.PORT || 4000

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
			let remoteURL = await audioFormats[0].url;
			const data = { message:  remoteURL};
  const range = req.headers.range;

  // Make a request to the remote URL with the Range header
  const options = {
    url: remoteURL,
    headers: {
      Range: range || 'bytes=0-', // If no Range header is provided, serve the entire file
    },
  };

  request(options)
    .on('response', (remoteResponse) => {
      if (remoteResponse.statusCode === 200) {
        // Full file response
        res.writeHead(200, {
          'Content-Length': remoteResponse.headers['content-length'],
          'Content-Type': 'audio/mpeg', // Set the appropriate content type for your file
        });
      } else if (remoteResponse.statusCode === 206) {
        // Partial content response
        res.writeHead(206, {
          'Content-Range': remoteResponse.headers['content-range'],
          'Accept-Ranges': 'bytes',
          'Content-Length': remoteResponse.headers['content-length'],
          'Content-Type': 'audio/mpeg', // Set the appropriate content type for your file
        });
      }

      remoteResponse.pipe(res);
    })
    .on('error', (error) => {
      console.error('Error:', error);
      res.writeHead(500);
      res.end('Internal Server Error');
    });
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

app.get('/search', async (req, res) =>
{
	let string = req.query.string;
	const searchTerm = req.query.string;
	try {
    const filters = await ytsr.getFilters(searchTerm);
    const filter = filters.get('Type').get('Video');
    const options = {
      limit: 10,
      type: 'audio', // This filters results to audio content
    };

    const searchResults = await ytsr(filter.url, options);
    res.end(JSON.stringify(searchResults.items));
  } catch (error) {
    console.error('Error searching YouTube:', error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})