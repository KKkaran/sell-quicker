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
router.get("/del/:id",(req,res)=>{
  console.log(req.params.id)
  //try to get all the comments and then delete them and then 
  //delete the post...
  Comment.findAll({
      where:{
          post_id:req.params.id
      }
  }).then(db=>{
      const comments = db.map(r=>r.get({plain:true}))
      const commentIds = comments.map(r=>r.id)
      console.log(commentIds)
      Comment.destroy({
          where:{
              id:commentIds
          }
      }).then(d=>{
          Post.destroy({
              where:{
                  id:req.params.id
              }
          })
          .then(dbPostData => {
              if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
              }
              res.render("dashboard")
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
      })
      .catch(er=>{
          console.log(er);
          //res.status(500).json(er)
      })
  })
  .catch(er=>{
      console.log(er);
      //res.status(500).json(er)
  })
})
//updating/edit a post in DB
router.put("/:id",(req,res)=>{
  Post.update({
      title:req.body.title,
      description:req.body.description
  },{
      where:{
          id:req.params.id
      }
  }).then(r=>res.json(r))
  .catch(er=>{
      console.log(er);
      res.status(500).json(er)
  })
})

router.get("/edit/:id",(req,res)=>{
  console.log(req.params.id)
  //from post id lets get the title and desc using seq and send the obj to handlebars for the view
  Post.findOne({
      where:{
          id:req.params.id
      }
  })
  .then(db=>{
      const post = db.get({plain:true})
      console.log(post)
      res.render("editPost",{post})
  })
})

module.exports = router;
