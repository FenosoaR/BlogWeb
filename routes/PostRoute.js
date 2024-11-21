const express = require('express')
const { write , single, postwrite, postComment, like, likeComment, search, postParCategory, postParDate} = require('../controllers/PostController')
const { ensureAuthenticated } = require('../config/security')
const router = express.Router()

router.get('/write' ,  write)
router.post('/write' , postwrite)
router.get('/single/:id' , single)
router.get('/search', search)
router.get('/like/:PostId' , ensureAuthenticated ,like)
router.post('/postComment' ,ensureAuthenticated, postComment)
router.get('/likeComment/:CommentId' ,ensureAuthenticated, likeComment)
router.get('/postCategory/:CategoryId' , postParCategory)
router.get('/postDate/:SelectDate' , postParDate)


module.exports = router