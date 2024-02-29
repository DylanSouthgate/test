const express = require('express')
const ytdl = require('ytdl-core');
const app = express()
const ytsr = require('ytsr');
const request = require('request');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const cors = require('cors');
const path = require('path');

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist/test/browser')));
app.use(cors({
  origin: 'http://localhost:4200', // or your specific domain whitelist
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow Authorization header
}));

//routes
const asianRoutes = require('./asian_website/router');
const spotify_recommendRoutes = require('./spotify_recommend/router');

app.use(asianRoutes);
app.use(spotify_recommendRoutes);


const dbURI = process.env.URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(5000))
  .catch((err) => console.log(err));

app.get('/', async(req, res) => {
  res.sendFile(path.join(__dirname, 'dist/test/browser/index.html'));
});