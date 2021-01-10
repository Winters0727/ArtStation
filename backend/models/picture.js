var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
    picTitle : {
        type : String,
        required : true,
    },
    picContext : {
        type : String,
        required : true,
    },
    picGenre : {
        type : Array,
        default : ['없음'],
    },
    picArtist : {
        type : String,
        required : true,
    },
    createAt : {
        type : Date,
        default : Date.now(),
    },
});

const Picture = mongoose.model('picture', pictureSchema);

module.exports = Picture;