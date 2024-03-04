const User = require("../models/User");
const jwt = require('jsonwebtoken');
const Playlist = require("../models/Playlist");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports.music_post = async (req, res) => {
    const { name } = req.body;
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        console.log(user['id'])

        const playlist = new Playlist({
          userId: user['id'],
          name: name
      });

      // Save the document to MongoDB
      await playlist.save();
      
      console.log('Form data saved successfully:', playlist);
      res.send('Form submitted and saved successfully!');
      }
    });
  } else {
  }
}

module.exports.music_get = async (req, res) => {

    try {
        console.log("Display Playlist: " + req.query.id);
//        const id = '65c3598af0dafac3898d6d26';
        // Find all documents matching the provided ObjectId
        const formData = await Playlist.find({ userId: new ObjectId(req.query.id) });
        
        res.json(formData);
    } catch (error) {
        console.error('Error fetching form data:', error);
        res.status(500).send('Error fetching form data.');
    }
}

module.exports.AllPlaylists = async (req, res) => {
    try {
        console.log("All playlist: " + req.query.id);
//        const id = '65c3598af0dafac3898d6d26';
        // Find all documents matching the provided ObjectId
        const formData = await Playlist.find({ userId: new ObjectId(req.query.id) });
        
        res.json(formData);
    } catch (error) {
        console.error('Error fetching form data:', error);
        res.status(500).send('Error fetching form data.');
    }
}