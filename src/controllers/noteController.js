const noteModel = require("../models/note");

const createNote = async (req,res)=> {

const {title,price,description,TReviews,Tratings,MediaCounts} = req.body;

const newNote = new noteModel({
    title : title,
    price : price,
    description : description,
    TReviews : TReviews,
    Tratings : Tratings,
    MediaCounts : MediaCounts,
    userId : req.userId
});

try {

    await newNote.save();
    res.status(201).json(newNote);
} catch (error) {
    console.log(error);
    res.status(500).json({message : "something went wrong"});
}

}
const getNotes = async (req,res) => {
    
try {
    const notes = await noteModel.find({userId : req.userId});
    res.status(200).json(notes);

} catch (error) {
    console.log(error);
    res.status(500).json({message : "something went wrong"});
}
}

module.exports = {createNote,getNotes}