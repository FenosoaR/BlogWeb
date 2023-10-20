module.exports =(sequelize , datatype) =>{
    return sequelize.define('LikeComment' , {
        CommentId:{
            type:datatype.INTEGER,
        },
        UserId:{
            type:datatype.INTEGER
        },
    })
}