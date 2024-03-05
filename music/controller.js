const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const ytsr = require('ytsr');
const ytdl = require('ytdl-core');
const request = require('request');

module.exports.home = async(req, res) => {
    console.log("yes")
    try{
        res.send("home");
    }
    catch (error)
    {
        console.error(error);
    }
}

module.exports.search = async(req, res) => {
  const query = req.query.string;

  console.log(query)
  
  const options =
  {
    limit: 20, // Number of results to retrieve
    filter: 'audio' // Filter for audio result
    };

// Perform the search
ytsr(query, options)
  .then(results => {
    // Process the search results
    res.end(JSON.stringify(results.items));
  })
  .catch(error => {
    // Handle errors
    console.error('Error searching:', error);
  });
}

module.exports.music1 = async (req, res) => {
  try {
    console.log("boom");
      if (req.query.link.includes('watch')) {
          let videoID = req.query.link;
          let info = await ytdl.getInfo(videoID);
          let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
          
          console.log(audioFormats[0].url);
          let remoteURL = await audioFormats[0].url;
          const data = { message: remoteURL };
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
      } else {
          res.send('boom'); // Send response only when condition is not met
      }
  } catch (error) {
      console.log(error);
      res.writeHead(500);
      res.end('Internal Server Error');
  }
};
module.exports.music = async (req,res) => {
    try
    {
        console.log("boom");
        if (req.query.link.includes('watch'))
        {
            let videoID = req.query.link;
            let info = await ytdl.getInfo(videoID);
            let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
			console.log(audioFormats[0].url);
            res.send(audioFormats[0].url);
        }
    }catch{

    }
}