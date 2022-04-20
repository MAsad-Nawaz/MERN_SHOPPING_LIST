const mongoose = require('mongoose');
const Schma = mongoose.Schema;


// Create Schema
const UserSchema = new Schma({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    register_date:{
        type:Date,
        default:Date.now,
    }
}); 

module.exports = Item = mongoose.model('user',UserSchema);