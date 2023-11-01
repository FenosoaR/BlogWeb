const express =require('express')
const { ensureAuthenticated } = require('../config/security')
const { login, register, postregister, postlogin} = require('../controllers/SecurityController')

const router = express.Router()

router.get('/login' , login)
router.get('/register' , register)
router.post('/register' , postregister)
router.post('/login' , postlogin)
router.get('/logout', ensureAuthenticated,(req,res)=>{
    //mamafa info ao anaty req http
    req.logout((error) =>{
        if(error){
            console.log(error);
        }else{
            req.flash('success' ,'you\'re logged out')
            return res.redirect('/')
        }
    })
})




module.exports = router