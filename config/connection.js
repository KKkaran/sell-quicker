require('dotenv').config()
const Sequelize = require('sequelize')
let seq;

if(process.env.JAWSDB_URL){
    seq = new Sequelize(process.env.JAWSDB_URL)
}else{
    seq = new Sequelize(process.env.db,process.env.user,process.env.password,
        {
            host:'localhost',
            dialect:'mysql',
            port:3306
        })
}

module.exports = seq;
