const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const notebook = new Schema({
  userid:{
    type:String,
    required:true,
  },
  createdAt:{
    type:Date,
    default: Date.now,
  },
  updatedAt:{

    // type:Date,
    // validate:{
    //   validator:function (createdAt) {
    //     if (createdAt) {
    //       return null;
        //}
      //}
    //}
    type: Date,
    default: Date.now,
  },

  note: [{ type: Schema.Types.ObjectId, ref: 'notes' }],
  // pages:{
  //   pagescreated: [{ type: Schema.Types.ObjectId, ref: 'notepage' }],
  // },

  accessType:{
    type:String,
    enum:['public','private'],
    default:'public'
  }
});


const notebooks = mongoose.model('notebook',notebook);
module.exports = notebooks;
