require('dotenv').config();

const express  = require('express');
const bodyParser = require("body-parser");
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash');
const ejs = require('ejs')
const isLoggedIn = require('./middleware/isLogged')
const userRouter = require('./routers/users')
const bookingRouter = require('./routers/booking')


require('./db/mongoose')

const app = express();
app.set('view engine', 'ejs');

var visited = '/'
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.use(session({
    secret: 'Our little secret.',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge : 30 * 24 * 60 * 60 * 1000 }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
app.use(userRouter)
app.use(bookingRouter)

app.get('/', isLoggedIn, (req,res)=>{
    res.render('index', {
        isLogged: req.isLogged
    })
})

app.listen(process.env.PORT, ()=>{
    console.log('Server is up on port '+ process.env.PORT)
})