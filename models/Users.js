module.exports = (sequelize , datatype) =>{
    return sequelize.define('Users' , {
        id:{
            type:datatype.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        username:{
            type:datatype.STRING,
            allowNull:false
        },
        password:{
            type:datatype.STRING,
            allowNull:false
        },
        email:{
            type:datatype.STRING,
            allowNull:false
        }, 
        pdp:{
            type:datatype.STRING,
            allowNull:true
        }
    })
}