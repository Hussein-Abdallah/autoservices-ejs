const mongoose = require('mongoose')
const validator = require('validator')
const passportLocalMongoose = require('passport-local-mongoose')

const locationSchema = new mongoose.Schema({

    place: String,
    code: String,
    country: String,
    active: {
        type: Boolean,
        default: false
    }
})

locationSchema.plugin(passportLocalMongoose)

const Location = mongoose.model('Location', locationSchema)

const newLocationSchema = new mongoose.Schema({

    code: String,
    requested: {type: Date, default: Date.now}

})

newLocationSchema.plugin(passportLocalMongoose)

const newLocation = mongoose.model('newLocation', newLocationSchema)

module.exports = {Location, newLocation}