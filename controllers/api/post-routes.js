const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment, Category } = require("../../models")

// The `/api/posts` endpoint

// get all posts
router.get('/', (req, res) => {
  console.log('get all posts');
  Post.findAll({
       attributes: ['id','title', 'description'],
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
      res.json(dbPostData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Get posts by id
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
     },
    include: [
      {
        model: Comment,
        include: {
          model: User
        }
      },
      {
        model: User      
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//Create new post 
  // expects {title: 'Taskmaster goes public!', description: 'https://taskmaster.com/press', category_id: 1}
router.post("/", (req, res) => {
  
  Post.create({
    title: req.body.title,
    description: req.body.description,
    creator_id: req.body.creator_id,
    category_id : req.body.category_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//Update posts
router.put('/:id',(req, res) => {
  Post.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//Delete posts based on post id
router.delete('/:id', (req, res) => {
  console.log('id', req.params.id);
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
