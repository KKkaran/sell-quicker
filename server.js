const express = require("express");
const sequelize = require("./config/connection");
const PORT = process.env.PORT || 3001;
const models = require('./models')

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))


sequelize.sync({force:false}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`listening on ${PORT}`);
    })
})

