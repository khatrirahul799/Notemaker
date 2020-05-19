const mongoose = require('mongoose');
const Schema = mongoose.Schema;  

const notes  = new Schema({
  Title:{
    type:String,
    required:true
  },
  Tag:{
    type:String,
    required:true
  },
  createdAt:{
    type: Date,
       default: Date.now,
  },
  updatedAt:{
    // type:Date,
    // validate:{
    //   validator:function (create) {
    //     if (!create) {
    //       return null;
    //     }
    //   }  
    // }
    type: Date,
    default: Date.now,
  },

  Content:{
    type:String
    
    }
})

const note = mongoose.model('notes',notes);
module.exports = note;