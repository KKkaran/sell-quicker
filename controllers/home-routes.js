const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Category } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  Post.findAll({
    order:[['updatedAt','DESC']],
    include: [
            {
              model: Comment,
              include: {
                model: User,
              }
            },
            {
              model: Category,
              attributes: ['category_name']
            },
            {
              model:User,
              attributes:["username"]
            }
          ]
    })
    .then(dbPostData => {
      //get all categories to populate the select menu
      Category.findAll().then(categoryData => {


        const categories = categoryData.map(r=>r.get({plain:true}))
        const post = dbPostData.map(r=>r.get({plain:true}))
        const updatedPosts = post.map(r=>{
          r.date = require("moment")(r.createdAt).format("LLLL")
      })
        const posts = {
          posts: post,
          categories: categories,
          login:req.session.loggedIn,
          username:req.session.username

        }
        console.log(posts)
        res.render("homepage",{posts})
      
  
      })
    })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

// get single post
router.get('/singlePost/:id',(req,res)=>{
    
  if(!req.session.loggedIn){
      res.render('login')
      return
  }
  Post.findOne({
      where:{
          id: req.params.id
      },
      include:[
          {
              model:User,
              attributes:['username'],
              foreignKey:'id'
          },
          {
              model:Comment,
              foreignKey:'user_id',
              attributes:['comment_text'],
              include:[
                  {
                      model:User,
                      foreignKey:'id',
                      attributes:['username']
                  }
              ]
              
          }
      ]
  })
  .then(db=>{
      const post = db.get({plain:true})
      // const g = post.map(r=>{
      //     r.date = require("moment")(r.createdAt).format("LLLL")
      // })
      const ggg = post.createdAt;
      post.date = require("moment")(ggg).format("LLLL")
      const updatedPost = {
          post:post,
          //userId:req.session.user_id
      }
      res.render('singlePost', {updatedPost});
      console.log(updatedPost)
  })
  .catch(er=>{
      console.log(er);
      res.status(500).json(er)
  })
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});
router.get('/logout',(req,res)=>{
  if(req.session.loggedIn){
      req.session.destroy(()=>{
          res.render("login")
          return
      })
  }
  res.render('login')
})
router.get('/dashboard',(req,res)=>{
    
  if(!req.session.loggedIn){
      res.render('login')
      return
  }
  Category.findAll().then(categoryData => {
    const categories = categoryData.map(r=>r.get({plain:true}))
    console.log(categories)
    const categ = {
      categories: categories
    }
    res.render('dashboard',{categ})
  })
    

})
module.exports = router;
