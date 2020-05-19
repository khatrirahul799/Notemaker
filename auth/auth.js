function authCheck(req,res,next){
    if(req.session.isLoggedIn){
        next();
    } else {
        return res.redirect('/login');
    }

};

module.exports = authCheck;