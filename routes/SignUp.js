const path = require('path');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const express = require('express');
//const fs = require('fs');
const router = express.Router();
const rootDir = require('../path/path');
const users = require('../Schemas/users');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:'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'
    }
}));


router.get('/signup',(req,res,next)=>{
    res.render(path.join(rootDir,'views','signup.ejs'),{
        csrfToken: req.csrfToken()
    });
    
  
})


router.post('/signup',(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    users.findOne({email:email})
    .then(userDoc => {
        if(userDoc){
           return res.redirect('/signup');
        }
        const user = new users({
            email:email,
            password:password
            
        });
       return user.save();
    })
    .then(result=>{
        res.redirect('/login');
        return transporter.sendMail({
            from:'khatrirahul7999@outlook.com',
            to:email,
            subject:'signup successed',
            html:'<h1>this is a test email that confirm your signup</h1>'
        }).catch(err=>{
            console.log(err);
        })
        
    })
    .catch(err=>{
        console.log(err);
    })
})
module.exports = router;