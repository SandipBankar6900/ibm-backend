const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    image:String
},{timestamps:true});


const GoogleUserModel = new mongoose.model("auth",userSchema);

module.exports = {GoogleUserModel};