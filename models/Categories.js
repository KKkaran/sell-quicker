const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Categories extends Model{
}

Categories.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        category_name:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
    sequelize,
    timestamps:true,
    freezeTableName:true,
    underscored:true,
    modelName:"categories"
})


module.exports = Categories;