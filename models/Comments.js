const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Comments extends Model{
}
Comments.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        comment_text:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len: [1]
            }
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'users',
                key:'id'
            }
        },
        post_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'posts',
                key:'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName:true,
        underscored:true,
        modelName:'comments'
    }
)

module.exports = Comments;