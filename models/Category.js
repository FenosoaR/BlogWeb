module.exports = (sequelize , datatype) => {
    return sequelize.define('Category' , {
        id:{
            type:datatype.INTEGER,
            autoIncrement: true,
            primaryKey:true
        }, 
        name:{
            type:datatype.STRING,
            allowNull:false
        }
    })
}
