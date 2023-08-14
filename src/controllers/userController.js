const userModel = require("../models/user");
const bcrytpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const signup = async (req,res)=> {

    //Existing user check 
    //hashed pass
    //user creation 
    //token generate

    const {username,email,password} = req.body;
    try {
      //Existing user check 
        const existingUser = await userModel.findOne({email : email})
        if(existingUser) {
            return res.status(400).json({message : "User already exists"});
        }

      //hashed pass
        const hashedPassword = await bcrytpt.hash(password,10);

      //user creation 
        const result = await userModel.create({
            email:email,
            password:hashedPassword,
            username:username
        });

       //token generate
        const token = jwt.sign({email : result.email,id : result._id},SECRET_KEY)
        //sharing token with user
        res.status(201).json({user : result,token : token})

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something wemt wrong."});
    }

}

const signin = async (req,res)=> {

    const {email,password} = req.body;
    
    try {

      //New user check 
      const existingUser = await userModel.findOne({email : email})
      if(!existingUser) {
       return res.status(404).json({message : "User not found"});
      }

      //password should match
      const matchPassword = await bcrytpt.compare(password,existingUser.password);

      if(!matchPassword) {
        return res.status(400).json({message : "Invalid Credentials"});
      }

      //Signin 
      const token = jwt.sign({email : existingUser.email,id : existingUser._id},SECRET_KEY)
      res.status(200).json({user : existingUser,token : token})


    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something wemt wrong."});
    }

}

module.exports = {signup,signin};