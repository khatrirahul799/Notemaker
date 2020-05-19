const mongoose = require('mongoose');
const Schema = mongoose.Schema;  

const users  = new Schema({

email:{
    type:String,
   
},
password:{
    type:String,
    
},
resetToken:String,
resetExpirationDate : Date,
})

const user = mongoose.model('users',users);
module.exports = user;