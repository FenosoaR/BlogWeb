const {Category , Posts , Users , Likes , Comment , LikeComment, Follow} = require('../models')
const path = require('path')
const {Op} =require('sequelize')
const moment = require('moment')
const {dateDePub} = require('../libs/datePub')



Category.hasMany(Posts)
Posts.belongsTo(Category)

Users.hasMany(Posts)
Posts.belongsTo(Users)

Users.hasOne(Comment)
Comment.belongsTo(Users)

Users.hasOne(LikeComment)
LikeComment.belongsTo(Users)

Comment.hasOne(LikeComment)
LikeComment.belongsTo(Comment)

const write = async(req, res) =>{

    const categories = await Category.findAll()

    const followers = await Follow.findAll({where : {FollowedId : req.user.id}})

    const date = new Date();

    const yearNow = date.getFullYear()

    let annee = []

    for (let index = yearNow + 1; index > 2015 ; index--) {
            annee.push(index)
            
    }

    return res.render('write' , {categories , user:req.user , followers, annee})
}

const postwrite = async(req, res)=>{

    try {
        
        
    let error = []
    const {title , content , categories , UserId} = req.body
    
    let file = null
    if (req.files && req.files.file) {
        file = req.files.file;
    }


    if(title == '' || content == ''  || categories == '' || file == '')
        error.push('Veuillez remplir les champs')

   

    if(file){
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
            UserId
        })
  
    await newPost.save()

    // return res.redirect('/homepage')

    return res.json({newPost})

    }else{

        const newPost = Posts.build({
            title,
            content,
            file:null,
            CategoryId:categories,
            UserId
        })

        await newPost.save()

    // return res.redirect('/homepage')

    return res.json({newPost})
  
    }

    


    } catch (error) {
        console.log(error);
    }

}

const single = async(req, res) =>{

    const id = req.params.id

    const categories = await Category.findAll()

    const single = await Posts.findOne({where : {id} , include : Users})
    
    let date_publication = dateDePub(single.createdAt)
    
    const posts = await Posts.findAll({limit : 3,
        where : {
                id :{
                    [Op.ne] : single.id
                },
            },
        })
        
    // console.log(posts);

    // console.log(single.createdAt);
    // Math.floor (arrondi nombre)

    const maintenant = moment();
  
    const differenceEnSecondes = maintenant.diff(single.createdAt, 'seconds');


    const likes = await Likes.findAll({where: {PostId : id} , include :Users})
    let nbLike = likes.length

    let postlike;
   
    const allComments = await Comment.findAll({where : {PostId : id} , include :Users})

    for (const item of allComments) {

        //permet de compter le nombres de lignes qui correspond aux conditions
        const nb_likes = await LikeComment.findAll({ where: { CommentId: item.id } });

        item.nb_likes = nb_likes.length
        

    }

    if(req.user){
        
        const like = await Likes.findOne({where : {PostId : id , UserId : req.user.id}})  
        
        const likeComment = await LikeComment.findAll({where : {UserId:req.user.id}})

        
        for(item of likeComment){


            const likedComment = allComments.find((comment) => comment.id === item.CommentId)
        
            if(likedComment){

                likedComment.liked = true

            }
           
        }

        if(like){

            postlike = true

        }else{

            postlike = false

        }
       
    }    
    const date = new Date();

    const yearNow = date.getFullYear()
    
    let annee = []
    
    for (let index = yearNow + 1; index > 2015 ; index--) {
        annee.push(index)
                
    }

    return res.render('single' , {categories , user :req.user , single, postlike,nbLike,posts,allComments, differenceEnSecondes, date_publication, likes, annee})
}

const search = async(req, res) =>{

    const {search}  = req.query
    let posts
    
    const categories = await Category.findAll()
    const category =  await Category.findOne({where :{ name : search }})

    const date = new Date();

    const yearNow = date.getFullYear()

    let annee = []

    for (let index = yearNow + 1; index > 2015 ; index--) {
            annee.push(index)
            
    }

    if(category){

         posts = await Posts.findAll({

            where:{
                
                    CategoryId : category.id
                },
            include : Users
            
            
        })

        return res.render('categorypost' , {categories , posts , user:req.user , category, dateDePub, annee})
        
    }else{

        posts = await Posts.findAll({
            where : {
                [Op.or] : [
                    {
                        title : {[Op.like] : `%${search}%`}
                    },
                    {
                        content : {[Op.like] : `%${search}%`}
                    }
                ]
            }, include : Users
        })

        return res.render('homepage' , {categories , posts , user:req.user , dateDePub, annee})

    }
 
}

const like = async(req, res) =>{

    const id = req.user.id
    const PostId = req.params.PostId

    const postAlreadyliked = await Likes.findOne({where : {PostId: PostId , UserId : req.user.id}})

    if(!postAlreadyliked){

        const newLike = Likes.build({
            PostId:PostId,
            UserId:id
        })
        await newLike.save()

        const like = await Likes.findAll({where: {PostId}})

        let nbLike = like.length
    
        return res.json({"message" : true , nbLike})

    }else{

        await Likes.destroy({where:{PostId : PostId , UserId:id}})

        const like = await Likes.findAll({where: {PostId}})

        let nbLike = like.length

        return res.json({"message" : false , nbLike})

    }

    
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

const likeComment = async(req, res)=>{

    const id = req.user.id
    const CommentId = req.params.CommentId

    const comsAlreadyLiked = await LikeComment.findOne({where : {CommentId , UserId : req.user.id}})


    if(!comsAlreadyLiked){

        const newLikeComment = LikeComment.build({
            CommentId,
            UserId : id,
        })
    
        await newLikeComment.save()

        const nbLikeComment = await LikeComment.count({ where: { CommentId } });
    
        return res.json({"message" : true , nbLikeComment})
       

    } else {

        await LikeComment.destroy({where : {CommentId , UserId : id}})

        const nbLikeComment = await LikeComment.count({ where: { CommentId } });
    
        return res.json({"message" : false , nbLikeComment})
    }
}

const postParCategory = async(req, res)=>{

    try {

    const CategoryId = req.params.CategoryId

    const categories =  await Category.findAll()
    const posts =  await Posts.findAll({where : {CategoryId} , include : Users})
    const category =  await Category.findOne({where : {id : CategoryId}})

    const date = new Date();

    const yearNow = date.getFullYear()

    let annee = []

    for (let index = yearNow + 1; index > 2015 ; index--) {
            annee.push(index)
            
    }

    return res.render('categorypost' , {categories , posts , user :req.user , category, dateDePub, annee})

    } catch (error) {

        console.log(error)
    }

    
}

const postParDate = async(req, res) =>{

    const SelectDate = req.params.SelectDate
    const categories =  await Category.findAll()


    const posts =  await Posts.findAll({where  : {createdAt : {
        [Op.between] : [new Date(`${SelectDate}-01-01`) , new Date(`${SelectDate}-12-31`)]
    }}, include : Users})

    const date = new Date();

    const yearNow = date.getFullYear()

    let annee = []

    for (let index = yearNow + 1; index > 2015 ; index--) {
            annee.push(index)
            
    }

    return res.render('triParDate' , {posts , categories , user:req.user , dateDePub , annee})

}

module.exports = {
    write ,
    single , 
    postwrite , 
    search,
    like, 
    postComment, 
    likeComment,
    postParCategory, 
    postParDate
}