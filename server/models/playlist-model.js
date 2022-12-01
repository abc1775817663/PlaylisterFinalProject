const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String,
            comments: [{user:String, content:String}]
        }], required: true },
        userName: { type: String, required: true },
        published: {type: Boolean, required: true},
        publishedDate: {type: String},
        likes: {type: Number},
        likedUsers: {type: String},
        dislikes: {type: Number},
        dislikedUsers: {type: String},
        listens: {type: Number},
        comments: {type: String}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
