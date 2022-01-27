const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt')

class Users extends Model{
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Users.init({

    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    username:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len : [4] 
        }
    }
},
{
    hooks:{
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
    
          async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
          } 
    },
    sequelize,
    freezeTableName: true,
    timestamps:true,
    underscored:true,
    modelName:'users'
    }
)


module.exports = Users;