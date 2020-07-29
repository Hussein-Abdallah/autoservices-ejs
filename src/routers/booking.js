const express = require('express');
const passport = require('passport')
const isLoggedIn = require('../middleware/isLogged')
const User = require('../models/users')
const {Location, newLocation} = require('../models/locations')
const _ = require('lodash')


const router = new express.Router();

router.get('/bookappointment',isLoggedIn, (req,res)=>{
    res.render('book', {
        isLogged: req.isLogged
    })
})

router.post('/booking-location', isLoggedIn, async (req,res)=>{
    const location = _.toUpper(req.body.postalCode)
    let postalCode = location.substring(0,3)
    visited = "/loginbooking"
    try {
        const location = await Location.findOne({code: postalCode})
        // if the postal code is not served yet
        if (!location) {
            const newlocation = await newLocation.findOne({code: postalCode})
            // check if the new postal code is in the requested location, if not then add else render the coming soon
            if (!newlocation) {
                const newcode = new newLocation({
                    code: postalCode
                })
                await newcode.save()
            }
                return res.status(200).render('comingsoon', {
                    isLogged: req.isLogged,
                    postal: req.body.postalCode
                })
        }

        res.status(200).render('index', {
                     isLogged: req.isLogged
                 })
        
        // if (req.isLogged === false){
        //     res.status(200).render('loginbooking', {
        //         isLogged: req.isLogged
        //     })
        // } else {
        //     res.status(200).render('index', {
        //         isLogged: req.isLogged
        //     })
        // }
    } catch (error) {
        console.log(error)
    }
    
})

router.post('/addlocation', async (req,res)=>{
    const location = new Location({

        code: 'K2J',
        place: 'Barrhaven',
        country: 'CA',
        active: true
    })

    try {
        await location.save()
        res.status(201).send(location)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;
