module.exports = (sequelize , datatype) =>{
    return sequelize.define('Follow' , {
        UserId : {
            type:datatype.INTEGER, 
            allowNull:false        
        },
        FollowedId:{
            type:datatype.INTEGER,
            allowNull:false
        },
    })
}