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
        }, 
        name:{
            type:datatype.STRING,
            allowNull:true
        },
        genre : {
            type:datatype.STRING,
            allowNull:true
        },
        addresse:{
            type:datatype.STRING,
            allowNull:true
        },
        dateNaissance :{
            type:datatype.DATE,
            allowNull:true
        }, 
        contact:{
            type:datatype.STRING,
            allowNull:true
        }
    })
}