module.exports =(sequelize , datatype) =>{
    return sequelize.define('Comment' , {
        PostId:{
            type:datatype.INTEGER,
        },
        UserId:{
            type:datatype.INTEGER
        },
        comment:{
            type:datatype.TEXT,
            allowNull:true
        }
    })
}