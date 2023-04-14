const {Category , Posts , Users , Likes , Comment} = require('../models')
const path = require('path')

Category.hasMany(Posts)
Posts.belongsTo(Category)

Users.hasMany(Posts)
Posts.belongsTo(Users)

Users.hasOne(Comment)
Comment.belongsTo(Users)

const write = async(req, res) =>{

    const categories = await Category.findAll()

    return res.render('write' , {categories , user:req.user})
}

const postwrite = async(req, res)=>{

    let error = []
    const {title , content , categories , user} = req.body
    
    const file = req.files.file

    if(title == '' || content == ''  || categories == '' || file == '')
        error.push('Veuillez remplir les champs')

    let ext = path.extname(file.name)
    let newFilename = `FILE-${Date.now()}${ext}`

    file.mv(`public/upload/${newFilename}` , (error)  =>{
        if(error){
            console.log(error);
        }
    })

    const newPost = Posts.build({
        title,
        content,
        file:newFilename,
        CategoryId:categories,
        UserId: user
    })

    await newPost.save()

    return res.redirect('/')

}

const single = async(req, res) =>{

    const id = req.params.id

    const categories = await Category.findAll()
    const posts = await Posts.findAll()
    const single = await Posts.findOne({where : {id} , include : Users})
    const comments = await Comment.findAll({where : {PostId : id} , include :Users})

    const like = await Likes.findAll({where: {PostId : id}})
    let nbLike = like.length

    let postlike;

    if(req.user){
        const like = await Likes.findOne({where : {PostId : id , UserId : req.user.id}})

        if(like){
            postlike = true
        }else{
            postlike = false
        }
    }    
    return res.render('single' , {categories , user :req.user , single, postlike , comments,nbLike , posts})
}

const removePost = async (req, res)=>{

    const id = req.params.id
    const userId = req.user.id

   const post =  await Posts.destroy({where : {id , UserId:userId}})

   if(post){

         return res.redirect('/')

   }else{
      
    const id = req.params.id

    const categories = await Category.findAll()

    const single = await Posts.findOne({where : {id} , include : Users})

    const comments = await Comment.findAll({where : {PostId : id} , include :Users})

    const like = await Likes.findAll({where: {PostId : id}})
    
    let nbLike = like.length

    let postlike;

    if(req.user){
        const like = await Likes.findOne({where : {PostId : id , UserId : req.user.id}})

        if(like){
            postlike = true
        }else{
            postlike = false
        }
    }
    
    return res.render('single' , {categories , user :req.user , single,postlike,nbLike, comments,error:'Vous ne pouvez pas effacer cette article'})

   }

    
}

const updatePost = async(req, res)=>{
    
    const id = req.params.id

    const post = await Posts.findOne({where : {id , UserId: req.user.id}})

    if(post){

        const categories = await Category.findAll()

        return res.render('edit' , {categories , user:req.user , post})

    }else{
        const id = req.params.id

        const categories = await Category.findAll()

        const single = await Posts.findOne({where : {id} , include : Users})

        const comments = await Comment.findAll({where : {PostId : id} , include :Users})

        const like = await Likes.findAll({where: {PostId : id}})
        
        let nbLike = like.length

        let postlike;

        if(req.user){
            const like = await Likes.findOne({where : {PostId : id , UserId : req.user.id}})
    
            if(like){
                postlike = true
            }else{
                postlike = false
            }
        }
        
        return res.render('single' , {categories , user :req.user , single,postlike,nbLike, comments,error:'Vous ne pouvez pas modifier cette article'})
      
    }
}

const updatepostPost = async(req, res)=>{

    const {id ,title , content , categories , user} = req.body

    const file = req.files.file

    let ext = path.extname(file.name)
    let newFilename = `FILE-${Date.now()}${ext}`

    file.mv(`public/upload/${newFilename}` , (error)  =>{
        if(error){
            console.log(error);
        }
    })

    const data = {
        title,
        content,
        CategoryId:categories,
        UserId:user,
        file:newFilename 
    }

    await Posts.update(data , {where:{id}})

    return res.redirect('/')

}

const allCategoryPost = async(req, res) =>{

    const CategoryId = req.params.CategoryId

    const categories = await Category.findAll()
    const posts = await Posts.findAll({where : {CategoryId}})
    const category = await Category.findOne({where : {id : CategoryId}})
    

    return res.render('categorypost' , {posts , categories , user:req.user , category})


}

const addlike = async(req, res) =>{
    const id = req.user.id
    const PostId = req.params.PostId

    const newLike = Likes.build({
        PostId:PostId,
        UserId:id
    })
    await newLike.save()

    return res.redirect(`/single/${PostId}`)
}

const deleteLike = async(req, res) =>{

    const id = req.user.id
    const PostId = req.params.PostId

    await Likes.destroy({where:{PostId : PostId , UserId:id}})

    return res.redirect(`/single/${PostId}`)
}

const postComment = async(req, res)  =>{

    const {comment , post} = req.body

    const newComment = Comment.build({
        comment,
        UserId:req.user.id,
        PostId :post,
    })

    await newComment.save()

    return res.redirect(`/single/${post}`)


}
module.exports = {write , single , postwrite , removePost ,updatePost , updatepostPost, allCategoryPost , addlike, deleteLike , postComment}