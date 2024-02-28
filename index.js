const express = require('express')
const ytdl = require('ytdl-core');
const app = express()
const ytsr = require('ytsr');
const request = require('request');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const song = require("./models/song");
const asianRoutes = require('./asian_website/router');

app.use(asianRoutes);


const dbURI = process.env.URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(5000))
  .catch((err) => console.log(err));

app.get('/', async(req, res) => {
  res.send("Home");
});
