const {Users} = require('../models')
const bcrypt = require ('bcryptjs')
const passport = require('passport')
const path = require('path')

const register = async(req, res) =>{
    let error = [undefined]

     return res.render('auth/register', {error})
} 

const postregister = async(req, res) =>{

    let error = []
    let data = null

    const {username , email , password , confirmation} = req.body

    if(username == '' || email == ''|| password == ''|| confirmation == '')

        error.push('Veuillez remplir les champs')
        
    if(password.length < 6 || password.length > 60)
    
        error.push('Votre mot de  passe est trop court ou trop long')

    if(confirmation != password)
    
        error.push('Votre mot de passe est incorrecte')
    
    if(email != '')
        data = await Users.findOne({where : {email}})

    if(data)
        error.push('Email invalide')

    if(error.length == 0){

        const hashedPassword = bcrypt.hashSync(password ,  12)

        const newUser = Users.build({
            username,
            email,
            password : hashedPassword
        })

        await newUser.save()
        return res.redirect('/login')

    }else{
        // console.log(error);
        return res.render('auth/register' , {error})
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

const postphoto = async(req, res)=>{

    const pdp = req.files.pdp

    let ext = path.extname(pdp.name)
    let newFilename = `FILE-${Date.now()}${ext}`

    pdp.mv(`public/pdp/${newFilename}` , (error)  =>{
        if(error){
            console.log(error);
        }
    })

    let user
    if(req.params.email)
        user = await Users.findOne({where : {email :req.user.email}})

    user = {
        username:req.user.username,
        email:req.user.email,
        password:req.user.password,
        pdp:newFilename 
    }

    await Users.update(user , {where : {email :req.user.email}})
    
    return res.redirect('/')
    
}

module.exports = {register , login , postregister , postlogin , postphoto}