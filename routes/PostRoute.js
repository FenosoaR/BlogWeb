const express = require('express')
const { write , single, postwrite, removePost, updatePost, updatepostPost, allCategoryPost, addlike, deleteLike, postComment} = require('../controllers/PostController')
const router = express.Router()

router.get('/write' ,  write)
router.post('/write' , postwrite)
router.get('/single/:id' , single)
router.get('/removePost/:id' , removePost)
router.get('/updatePost/:id' , updatePost)
router.post('/updatepost' , updatepostPost)
router.get('/allCategoryPost/:CategoryId' , allCategoryPost)
router.get('/addLike/:PostId' , addlike)
router.get('/deleteLike/:PostId' , deleteLike)
router.post('/postComment' , postComment)

module.exports = router