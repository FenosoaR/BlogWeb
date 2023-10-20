const express = require('express')
const { write , single, postwrite, postComment, like, likeComment, search, postParCategory, postParDate} = require('../controllers/PostController')
const router = express.Router()

router.get('/write' ,  write)
router.post('/write' , postwrite)
router.get('/single/:id' , single)
router.get('/search', search)
router.get('/like/:PostId' , like)
router.post('/postComment' , postComment)
router.get('/likeComment/:CommentId' , likeComment)
router.get('/postCategory/:CategoryId' , postParCategory)
router.get('/postDate/:SelectDate' , postParDate)


module.exports = router