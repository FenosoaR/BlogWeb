//authentification>yarn add express ejs express-ejs-layouts express-session connect-flash bcryptjs passport passport-local

const express = require('express')
const layout = require('express-ejs-layouts')
const fileUpload = require('express-fileupload')
const database = require('./models')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

const HomeRoute = require('./routes/HomeRoute')
const SecurityRoute = require('./routes/SecurityRoute')
const PostRoute = require('./routes/PostRoute')
const { ensureAuthenticated } = require('./config/security')

require('./config/passport')(passport)

const app = express()

app.use(fileUpload())
app.use(layout)
app.set('view engine' ,'ejs')
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:false}))

app.use(session({
    resave:true,
    secret:'test test',
    saveUninitialized:true
}))

app.use(flash())

app.use((req,res, next)=>{
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()

})

app.use(passport.initialize())
app.use(passport.session())

app.use('/' ,  HomeRoute)
app.use('/',SecurityRoute)
app.use('/' ,ensureAuthenticated, PostRoute )

database.sequelize.sync({force:false})
.then(() => {
    app.listen(9000 , () =>{
        console.log('server started on http://localhost:9000/');
    })    
})
.catch( error => console.log(error))