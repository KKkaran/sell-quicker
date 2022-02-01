const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Category } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  Post.findAll({
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
          categories: categories
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
router.get('/post/:id', (req, res) => {
    console.log('to get advt based on id');
  /*Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });*/
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
