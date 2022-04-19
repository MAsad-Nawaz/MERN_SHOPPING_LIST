const mongoose = require('mongoose');
const Schma = mongoose.Schema;


// Create Schema
const ItemSchema = new Schma({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    }
}); 

module.exports = Item = mongoose.model('item',ItemSchema);