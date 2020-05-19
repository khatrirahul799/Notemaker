const path = require('path');

const express = require('express');
const fs = require('fs');
const router = express.Router();
const rootDir = require('../path/path');
const users = require('../Schemas/users');
const auth = require('../auth/auth');

router.get('/homepage',auth,(req,res,next)=>{
    res.render(path.join(rootDir,'views','homepage.ejs'));
    
  
})

module.exports = router;