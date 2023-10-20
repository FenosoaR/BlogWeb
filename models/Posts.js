module.exports =(sequelize , datatype) =>{
    return sequelize.define('Posts' , {
        id:{
            primaryKey:true,
            autoIncrement:true, 
            type:datatype.INTEGER
        },
        title:{
            allowNull:false,
            type:datatype.STRING
        },
        content:{
            type:datatype.TEXT,
            allowNull:false
        },
        file:{
            type:datatype.STRING,
            allowNull:true
        }
    })
}