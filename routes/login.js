const path = require('path');

const express = require('express');
var mongoose = require("mongoose");

const db = mongoose.connection;
const collection = db.collection('users')
const router = express.Router();
const rootDir = require('../path/path');
const user = require('../Schemas/users');





router.get('/login',(req,res,next)=>{
    res.render(path.join(rootDir,'views','login.ejs'),{
        csrfToken: req.csrfToken()
    });
    

})

router.post('/login',(req,res,next)=>{
    const uemail = req.body.email;
    const password = req.body.password;


    user.findOne({email:uemail})
    .then(result=>{
        if(!result){
            console.log('err invalid email id')
            res.redirect('/login');
            
        }else if(result.password==password){
            req.session.isLoggedIn = true;
            res.redirect('/homepage');
        }else{
            res.redirect('/login');
        }
    }
    ).catch(err=>{
        console.log(err);
    }

    );
    // users.findOne({email:uemail},(err,result)=>{
    //     if (err){
    //         return res.send('invalid email id');
    //     }
    //     else if (result.password==password) {
    //             req.session.isLoggedIn = true;
    //             res.redirect('/homepage');
    //     }
    //     else{
    //         res.redirect('/login');
    //     }
        
    // })

})

// notes.find({'_id': { $in: result.note}}, function(err, result){
//     if(!err){
//         console.log(result);
//         res.send(result);
//     }
// })


router.get('/logout',(req,res,next)=>{
    
    req.session.destroy(()=>{
        res.send('logout successfully');
    })

});




module.exports = router;