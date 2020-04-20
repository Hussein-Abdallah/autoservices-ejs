const passport = require('passport')


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
       req.isLogged = true;
       return next();
    }
    else {
        req.isLogged = false;
        return next();

    }
    
}

module.exports = isLoggedIn