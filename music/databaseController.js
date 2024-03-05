const Playlist = require('../models/Playlist');
const Song = require('../models/song');
const Playlist_Song = require('../models/Playlist_Song');

module.exports.playlist = async(req, res) => {
    let userid = req.query.id;
    try{
        let user = await Playlist.find({
            "userId" : userid
            });
        res.send(user);
    }
    catch (error)
    {
        console.error(error);
    }
}

async function save_to_playlist(song_id,playist_id)
{
    const existingDoc = await Playlist_Song.findOne({
        playlistId: playist_id,
	    songId: song_id
    });
    if (!existingDoc) {
        let data = {
            playlistId: playist_id,
            songId: song_id
        }
        const newDoc = new Playlist_Song(data);
        await newDoc.save();
        console.log(newDoc);
    } else {
        console.log("Duplicate document found. Not saving.");
        console.log(existingDoc);
    }
}

module.exports.song = async(req, res) => {
    console.log(req.body.playlist);
    res.send("works");
    const existingDoc = await Song.findOne({url : req.body.string.url});

    if (!existingDoc) {
        let data = {
            title: req.body.string.title,
	        url: req.body.string.url,
	        image : req.body.string.bestThumbnail.url,
            name : req.body.string.author.name
        }
        const newDoc = new Song(data);
        await newDoc.save();
        console.log(newDoc);
        save_to_playlist(newDoc._id,req.body.playlist);
    } else {
        console.log("Duplicate document found. Not saving.");
        console.log(existingDoc);
        save_to_playlist(existingDoc._id,req.body.playlist);
    }
}

module.exports.playlistsong = async(req, res) => {
    console.log(req.body.string);
    const playlistId = req.body.string;
//    res.send("works");
//    const existingDoc = await Playlist_Song.find({playlistId : req.body.string});

//    console.log(existingDoc);
Playlist_Song.find({ playlistId: playlistId }).exec((err, playlistSongs) => {
    if (err) {
        console.error(err);
        // Handle error
        return;
    }

    // Extract song IDs from the playlistSongs
    const songIds = playlistSongs.map(song => song.songId);
    console.log(songIds)
    Song.find({ _id: { $in: songIds } }).exec((err, results) => {
    if (err) {
        console.error(err);
        // Handle error
        return;
    }

    // Access the results with the matched documents
    const modifiedResults = results.map(result => {
        return {
            ...result.toObject(), // Convert Mongoose document to plain JavaScript object
            playlist: req.body.string
        };
    });
    res.send(modifiedResults);
});
});
}

module.exports.createplaylist = async(req, res) => {
    console.log(req.body.name);
    const existingDoc = await Playlist.findOne({name : req.body.name,"userId" : req.body.id});
    

    if (!existingDoc) {
        let data = {
            name : req.body.name,
            userId : req.body.id
        }
        const newDoc = new Playlist(data);
        await newDoc.save();
        res.send(newDoc);
    } else {
        console.log("Duplicate document found. Not saving.");
        console.log(existingDoc);
    }
}

module.exports.DeleteAsianPlaylist = async(req, res) => {
    let playlistid = req.query.id;
    try{
        let playlist = await watchlist.find({
            "_id" : playlistid
            });
        let playlistTitles = await watchlist_playlist.find({
            "playlistId" : playlistid
        });
        let boom = await watchlist_playlist.deleteMany({"playlistId" : playlistid});
        res.send(boom);
    }
    catch (error)
    {
        console.error(error);
    }
}

