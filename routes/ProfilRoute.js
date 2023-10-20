const express= require('express')
const { profil,edit, postedit, deletePost, otherProfil, notification, listeFollowers, postphoto, editProfil } = require('../controllers/ProfilController')
const router = express.Router()
router.get('/profil' , profil)
router.get('/edit/:id' , edit)
router.post('/edit' , postedit)
router.get('/delete/:id' , deletePost)
router.get('/otherProfil/:UserId' , otherProfil)
router.get('/notification' , notification)
router.get('/listeFollowers/:UserId' , listeFollowers)
router.post('/postphoto' , postphoto)
router.post('/editProfil' , editProfil)

module.exports = router