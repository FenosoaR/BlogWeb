const { Category, Posts, Users, Follow, Likes, LikeComment, Notification } = require('../models')
const path = require('path')
const { Op } = require('sequelize')
const { dateDePub} = require('../libs/datePub')
const moment = require('moment')



Users.hasOne(Follow)
Follow.belongsTo(Users)

Users.hasOne(Likes)
Likes.belongsTo(Users)

Users.hasOne(Notification)
Notification.belongsTo(Users)

const profil = async (req, res) => {
    
    const categories = await Category.findAll()
    const posts = await Posts.findAll({ where: { UserId: req.user.id } })
    let nb_posts = posts.length

    const follow = await Follow.findAll({ where: { FollowedId: req.user.id } })

    let nb_follow = follow.length

    const date = new Date();

    const yearNow = date.getFullYear()

    let annee = []

    for (let index = yearNow + 1; index > 2015 ; index--) {
            annee.push(index)
            
    }

    const notifications =  await Notification.findAll({
        where : {FollowedId : req.user.id },
        order: [['createdAt', 'DESC']],
        include : Users
    })

    for(item of notifications){

        const maintenant = moment();
  
        const differenceEnSecondes = maintenant.diff(item.createdAt, 'seconds');

        item.publier = differenceEnSecondes

    }

    return res.render('profil', {  dateDePub,categories, user: req.user,notifications, posts, nb_posts, nb_follow , annee})
}
const otherProfil = async (req, res) => {

    const UserId = req.params.UserId

    const categories = await Category.findAll()

    const posts = await Posts.findAll({ where: { UserId }, include: Users })

    const profil_user = await Users.findOne({ where: { id: UserId } })

    const nb_follow = await Follow.findAll({ where: { FollowedId: UserId } })
    let nbFollow = nb_follow.length

    let nb_posts = posts.length

    let already_followed;

    const date = new Date();

    const yearNow = date.getFullYear()

    let annee = []

    for (let index = yearNow + 1; index > 2015 ; index--) {
            annee.push(index)
            
    }


    if (req.user) {

        const follower = await Follow.findOne({ where: { FollowedId: UserId, UserId: req.user.id } })


        if (follower) {
            already_followed = true
        } else {
            already_followed = false
        }
    }
  
    const notifications =  await Notification.findAll({
        where : {FollowedId : req.user.id },
        order: [['createdAt', 'DESC']],
        include : Users
    })

    for(item of notifications){

        const maintenant = moment();
  
        const differenceEnSecondes = maintenant.diff(item.createdAt, 'seconds');

        item.publier = differenceEnSecondes

    }

    return res.render('otherProfil', {notifications, dateDePub, annee,categories, posts, nb_posts, profil_user, user: req.user, already_followed, nbFollow })
}
const edit = async (req, res) => {

    const id = req.params.id
    const post = await Posts.findOne({ where: { id, UserId: req.user.id } })
    const categories = await Category.findAll()
    const date = new Date();

    const yearNow = date.getFullYear()

    let annee = []

    for (let index = yearNow + 1; index > 2015 ; index--) {
            annee.push(index)
            
    }
    const notifications =  await Notification.findAll({
        where : {FollowedId : req.user.id },
        order: [['createdAt', 'DESC']],
        include : Users
    })

    for(item of notifications){

        const maintenant = moment();
  
        const differenceEnSecondes = maintenant.diff(item.createdAt, 'seconds');

        item.publier = differenceEnSecondes

    }

    return res.render('edit', {notifications,post, categories, user: req.user, annee, dateDePub })
}

const postedit = async (req, res) => {

    const { title, user, content, categories, id } = req.body
   
    let file = null
    if (req.files && req.files.file) {
        file = req.files.file;
    }

    let post =  await Posts.findOne({where : {id}})

    if(file){

        let ext = path.extname(file.name)
        let newFilename = `FILE-${Date.now()}${ext}`

        file.mv(`public/upload/${newFilename}`, (error) => {
            if (error) {
                console.log(error);
            }
        })

         post = {
            title,
            content,
            CategoryId: categories,
            UserId: user,
            file: newFilename
        }

    }else{

        post = {
            title,
            content,
            CategoryId: categories,
            UserId: user,
            file: post.file
        }
    }
 
    await Posts.update(post, { where: { id } })

    return res.redirect('/profil')



}
const deletePost = async (req, res) => {

    await Posts.destroy({ where: { id: req.params.id, UserId: req.user.id } })

    return res.redirect('/profil')

}
const notification = async (req, res) => {

    const categories = await Category.findAll()

    const notifications =  await Notification.findAll({
        where : {FollowedId : req.user.id },
        order: [['createdAt', 'DESC']],
        include : Users
    })

    for(item of notifications){

        const maintenant = moment();
  
        const differenceEnSecondes = maintenant.diff(item.createdAt, 'seconds');

        item.publier = differenceEnSecondes

    }


    
    const date = new Date();

    const yearNow = date.getFullYear()

    let annee = []

    for (let index = yearNow + 1; index > 2015 ; index--) {
            annee.push(index)
            
    }

    return res.render('notification', { categories, user: req.user,notifications, annee, date, dateDePub })
}


const listeFollowers = async(req, res) => {

    const UserId = req.params.UserId
    const categories = await Category.findAll()
    const date = new Date();

    const yearNow = date.getFullYear()

    let annee = []

    for (let index = yearNow + 1; index > 2015 ; index--) {
            annee.push(index)
            
    }
   
    const followers =  await Follow.findAll({where : {FollowedId : UserId } , include : Users}) 
    

    return res.render('listeFollowers' , {followers , categories , user : req.user, annee })
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
    if(req.user)
    
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

const editProfil =  async(req, res) =>{

    const {name , addresse , contact , dateNaissance ,genre} = req.body

    let user

    if(req.user)

        user = await Users.findOne({where : {email : req.user.email}})
        
    user = {
        username:req.user.username,
        email:req.user.email,
        password:req.user.password,
        pdp:req.user.pdp,
        name:name,
        addresse:addresse,
        contact:contact,
        dateNaissance:dateNaissance,
        genre:genre 
    }

    await Users.update(user , {where : {email :req.user.email}})

    return res.redirect('/profil')
}
module.exports = {
    profil,
    edit,
    postedit,
    deletePost, 
    otherProfil,
    notification,
    listeFollowers,
    postphoto,
    editProfil
}