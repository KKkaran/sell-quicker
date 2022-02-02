const express = require("express");
const seq = require('./config/connection');
const PORT = process.env.PORT || 3001;
const models = require('./models')
const routes = require('./controllers')
const handlebars = require('express-handlebars');
const hbs = handlebars.create({});
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');

const app = express()
app.engine('handlebars',hbs.engine);
app.set('view engine','handlebars');
//creating a session
app.use(
    session({
        secret:"thisissecret",
        cookie:{
            maxAge:10 * 60 *  1000, //user is logged out in 10 minutes
            sameSite:true,
            secure: false,
        },
        resave:false,
        saveUninitialized:false,
        store: new SequelizeStore({
            db: seq
        })
}))

app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);



seq.sync({force:false}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Listening on the ${PORT} using Sequelize`)
    })
})

