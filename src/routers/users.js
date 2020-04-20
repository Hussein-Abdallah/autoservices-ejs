const express = require('express');
const passport = require('passport')
const isLoggedIn = require('../middleware/isLogged')
const User = require('../models/users')

const router = new express.Router();

router.get('/login', isLoggedIn, async (req,res)=>{
    // console.log(req.flash())
    // console.log(req.session)
    res.render('login', {
        isLogged: req.isLogged,
        alerts: req.flash('error')
    })
})

router.get('/register', async (req,res)=>{
    res.render('register')
})

//Google Authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'https://www.googleapis.com/auth/userinfo.email'] }))

router.get('/auth/google/autoservices', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

// Facebook Authentication
router.get('/auth/facebook', passport.authenticate('facebook', {
scope: ['user_location', 'email', 'user_friends']
}));

router.get('/auth/facebook/autoservices', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
    res.redirect('/');
});


router.post('/register', async (req,res)=>{
    
    try {
        await User.register({username: req.body.username}, req.body.password)
        passport.authenticate('local')(req,res, function(){
            res.redirect('/secrets')
        })
    } catch (error) {
        console.log(error.message)
        res.redirect('/register')
    }

})

router.post("/login", passport.authenticate("local", 
  { successRedirect: "/", 
    failureRedirect: "/login", 
    failureFlash: true })
);

// // Login Post
// router.post('/login', async (req,res, next)=>{
    
//     const user = new  User ({
//         username: req.body.username,
//         password: req.body.password
//     })
    
//     // login function from passport
//     req.login(user, (err)=>{
//         if (err) {
//             console.log(err)
//             res.redirect('/')
//         }
//         passport.authenticate('local')(req,res, function(){
//             res.redirect('/')
//         })
//     })
// })

//change password
router.post('/password',async (req,res)=>{
    User.findOne({_id: req.body.id}).then((user) => {
        user.setPassword(req.body.newPassword,(err, newPassword) => {
            if (err) throw new Error(err)
            newPassword.save();
            res.status(200).json({ message: 'password change successful' });
        })
    }).catch((error)=>{
        console.log(error.message)
    })
})

// Logout Function
router.get('/logout', (req, res) =>{
    req.logout();
    res.redirect('/')
})

module.exports = router;


// passport.use(new BasicStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.validPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });
//     }
//   ));