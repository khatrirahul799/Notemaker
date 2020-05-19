const path = require('path');

const express = require('express');
const router = express.Router();
const rootDir = require('../path/path');

router.get('/home',(req,res,next)=>{
    res.send('<h1>You Are logged in successfully</h1>');
})
module.exports = router;