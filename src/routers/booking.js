const express = require('express');
const passport = require('passport')
const isLoggedIn = require('../middleware/isLogged')
const User = require('../models/users')
const _ = require('lodash')


const router = new express.Router();

router.get('bookappointment',(req,res)=>{
    res.render('book')
})



module.exports = router;
