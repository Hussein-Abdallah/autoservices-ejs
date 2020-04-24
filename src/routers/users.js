const express = require('express');
const passport = require('passport')
const isLoggedIn = require('../middleware/isLogged')
const User = require('../models/users')
const _ = require('lodash')

const router = new express.Router();

router.get('/login', isLoggedIn, async (req,res)=>{
    visited = '/'
    res.render('login', {
        isLogged: req.isLogged,
        alerts: req.flash('error')
    })
})

router.get('/about', isLoggedIn, async (req,res)=>{
    res.render('home', {
        isLogged: req.isLogged,
        alerts: req.flash('error')
    })
})

router.get('/register', isLoggedIn, async (req,res)=>{
    visited = '/'
    if(req.isLogged === true){
        return res.redirect('/')
    }
    res.render('register',{
        isLogged: req.isLogged,
        alerts: req.flash('error')
    })
})

//Google Authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'https://www.googleapis.com/auth/userinfo.email'] }))

router.get('/auth/google/autoservices', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
    // Successful authentication, redirect home.
    console.log(visited)
    res.redirect('/');
});

// Facebook Authentication
router.get('/auth/facebook', passport.authenticate('facebook', {
scope: ['user_location', 'email', 'user_friends']
}));

router.get('/auth/facebook/autoservices', passport.authenticate('facebook', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
    console.log(visited)
    res.redirect('/');
});


router.post('/register', async (req,res)=>{
    try {
        const newUser = await User.register({username: _.toLower(req.body.username)}, req.body.password)
        newUser.firstName = req.body.firstName
        newUser.lastName = req.body.lastName
        newUser.email = req.body.email
        newUser.phoneNumber = req.body.phoneNumber
        newUser.terms = req.body.terms
        await newUser.save()
        passport.authenticate('local',{failureFlash:true})(req,res, function(){
            res.redirect('/')
        })
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/register')
    }

})

// router.post("/login", passport.authenticate("local", 
//   { successRedirect: "/", 
//     failureRedirect: "/login", 
//     failureFlash: true })
// );

// Login Post
router.post('/login', async (req,res, next)=>{
    console.log(visited)
    // console.log(req.path)
    const user = new  User ({
        username: req.body.username,
        password: req.body.password
    })
    
    // login function from passport
    req.login(user, (err)=>{
        if (err) {
            res.status(500).send('500 error try again')
        }
        if (!user) {
            res.status(500).send('500 error try again')
        }
        passport.authenticate('local')(req,res, function(){
            // console.log(req.path)

            res.redirect('/')
        })
    })
})

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