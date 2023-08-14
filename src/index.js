const express = require("express");  //import express library
const userRouter = require("./Routes/UserRoutes");
const noteRouter = require("./Routes/noteRoutes");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const mongoose = require("mongoose");

app.use(express.json());   //request ki body ko json me convert 

app.use(cors());

app.use("/users",userRouter); 
app.use("/note",noteRouter);

app.get("/",(req,res)=>{
res.send("Notes API");
});

const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://ashishkaur13:ashishkaur13@cluster13.10kqsvr.mongodb.net/notes_db?retryWrites=true&w=majority")
.then(()=>{
    app.listen(PORT,()=> {
        console.log("Server started on port " + PORT);
    });
}).catch((error)=>{
    console.log(error);
})
