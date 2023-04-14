module.exports =(sequelize , datatype) =>{
    return sequelize.define('Likes' , {
        PostId:{
            type:datatype.INTEGER,
        },
        UserId:{
            type:datatype.INTEGER
        }
    })
}