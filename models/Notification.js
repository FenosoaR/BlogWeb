module.exports = (sequelize , datatype) =>{
    return sequelize.define('Notification' , {
        UserId:{
            type:datatype.INTEGER
        },
        FollowedId:{
            type:datatype.INTEGER
        },
        name:{
            type:datatype.STRING,
            allowNull:false
        },
        lu:{
            type:datatype.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        TargetId:{
            type:datatype.INTEGER
        }
    })
}