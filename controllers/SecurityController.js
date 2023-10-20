const {Users} = require('../models')
const bcrypt = require ('bcryptjs')
const passport = require('passport')
const path = require('path')

const register = async(req, res) =>{
    
     return res.render('auth/register')
} 

const postregister = async(req, res) =>{

    let data = null

    try {
        const {username , email , password , confirmation} = req.body
    
        if(email != '')
            data = await Users.findOne({where : {email}})
        
        if(password.length  < 6 || password.length > 60)
            req.flash('error' , 'Votre mot de passe doit avoir entre 6 et 60 caractères')
    
        if(confirmation != password )
            req.flash('error' , 'Mot de passe incorrecte')
    
        if(data) 
            req.flash('error' , 'Email invalide')

        const hashedPassword = bcrypt.hashSync(password ,  12)
            
        const newUser = Users.build({
            username,
            email,
            password : hashedPassword
        })
    
        await newUser.save()
    
        req.flash('success' ,'Inscription réussie. Connectez-vous maintenant.')
    
        return res.redirect('/login')

    } catch (error) {
        
        req.flash('error' , 'Erreur lors de l inscription')
     
        res.redirect('/register');
    }

}

const login = async(req, res) =>{

    return res.render('auth/login')
} 

const postlogin = async(req, res , next)=>{

    passport.authenticate('local' , {
        successRedirect:'/',
        failureRedirect:'/login',
        failureFlash:true
    })(req, res, next)
}



module.exports = {register , login , postregister , postlogin}