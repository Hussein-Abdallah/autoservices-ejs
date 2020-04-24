const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+'@cluster0-ul11x.mongodb.net/autoservices', { 
    useUnifiedTopology: true, 
    autoIndex: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})