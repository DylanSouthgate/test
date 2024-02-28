const express = require('express')
const ytdl = require('ytdl-core');
const app = express()
const ytsr = require('ytsr');
const request = require('request');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const song = require("./models/song");


const dbURI = process.env.URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(5000))
  .catch((err) => console.log(err));

app.get('/', async(req, res) => {
      try {
  //        const id = '65c3598af0dafac3898d6d26';
          // Find all documents matching the provided ObjectId
          const formData = await song.find({ _id: new ObjectId('65d5e6c4cebf5676635ca414') });
          
          res.json(formData);
      } catch (error) {
          console.error('Error fetching form data:', error);
          res.status(500).send('Error fetching form data.');
      }
});
