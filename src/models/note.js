const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    description : {
        type : String,
    },

    TReviews : {
        type : Number,
        required : true
    },

    Tratings : {
        type : Number,
        required : true
    },

    MediaCounts : {
        type : Number,
        required : true
    },

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
},   {timestamps : true});

module.exports = mongoose.model("Note", NoteSchema);