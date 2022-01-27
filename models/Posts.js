const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model{
}

Posts.init({

    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title:{
        type:DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    creator_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: 'users',
            key:'id'
        }
    },
    category_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'categories',
            key:"id"
        }
    }
},
{
    sequelize,
    freezeTableName: true,
    timestamps:true,
    underscored:true,
    modelName:'posts'
    }
)


module.exports = Posts;