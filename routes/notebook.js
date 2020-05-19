const path = require('path');

const express = require('express');
const fs = require('fs');
const notebook = require('../Schemas/notebook');
const notes = require('../Schemas/notes');
const router = express.Router();
const rootDir = require('../path/path');


router.put('/Notebook',(req,res,next)=>{
    notebook.create(req.body, function (err, result) {
        if (err) return console.log(err);
        res.send(result.id);
      });
})


  

router.post('/Notebook',(req,res,next)=>{
  notebook.findByIdAndUpdate(req.body.id,req.body.update,{new:true}, function (err, result) {
        if (err) return console.log(err);
        res.send(`Document ${result} Updated successully`);
      });
})

router.delete('/Notebook',(req,res,next)=>{

    // TO DELETE LAST ADDED SEARCHED DOCUMENT//
    // collection.deleteOne(req.body, (error, result) => {
    //     if(error) {
    //         return response.status(500).send(error);
    //     }
    //     res.redirect('/home');
    //     console.log(result)

    // });
    notebook.deleteMany(req.body, function (err, result) {
        if (err) return console.log(err);
        res.send('Details for user ' + req.body.name +' Deleted Successfully');
      });
})


router.get('/Notebook', (req, res, next) => {
    notebook.countDocuments({}, function (err, result) {
        if (err) return console.log(err);
        res.send('hello count is '+ result);
        console.log(result);
      });
    });


module.exports = router;