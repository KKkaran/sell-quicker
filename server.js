const express = require("express");
const sequelize = require("./config/connection");
const PORT = process.env.PORT || 3001;
const models = require('./models')
const routes = require('./controllers');
const routes1= require('./controllers/api')
const exphbs = require("express-handlebars")
const handlebars = exphbs.create({})

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(routes);
app.use(routes1);

sequelize.sync({force:false}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`listening on ${PORT}`);
    })
})

