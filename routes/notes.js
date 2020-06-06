const path = require('path');

const express = require('express');
const fs = require('fs');
const notebook = require('../Schemas/notebook');
const notes = require('../Schemas/notes');
const router = express.Router();
const auth = require('../auth/auth');
const rootDir = require('../path/path');
var ObjectId = require('mongoose').Types.ObjectId; 


router.put('/Notebook/:notebookid/notes',auth,(req,res,next)=>{
        notebookid = new ObjectId(req.params.notebookid);
        //data = req.body;
        notes.create(req.body, function (err, result) {
            if (err) {
                return console.log(err);
            }
            notebook.findByIdAndUpdate(notebookid,{ "$push": { "note": new ObjectId(result.id) } },{new:true},function(err,result){
            if (err) return console.log('there are not such notebook');
            console.log(result);
            
            });
        })
            res.send("success");

});


router.post('/Notebook/notes',(req,res,next)=>{
    notes.findByIdAndUpdate(req.body.id,req.body.update,{new:true}, function (err, result) {
        if (err) return console.log(err);
        res.send(`Document ${result} Updated successully`);
      });
})

router.delete('/Notebook/notes',(req,res,next)=>{

    // TO DELETE LAST ADDED SEARCHED DOCUMENT//
    // collection.deleteOne(req.body, (error, result) => {
    //     if(error) {
    //         return response.status(500).send(error);
    //     }
    //     res.redirect('/home');
    //     console.log(result)

    // });
    notes.deleteMany(req.body, function (err, result) {
        if (err) return console.log(err);
        res.send('Details for user ' + req.body.name +' Deleted Successfully');
      });
})


router.get('/Notebook/:notebookId/notes',auth, (req, res, next) => {
    let notebookId = new ObjectId(req.params.notebookId);
    notebook.findById(notebookId, function(err, result){
        notes.find({
            '_id': { $in: result.note}
        }, function(err, result){
            if(!err){
                res.send(result);
            }
        })
    })
  
    });


module.exports = router;