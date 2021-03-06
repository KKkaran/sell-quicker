const router = require('express').Router();
const { User, Post, Comment, Category } = require('../../models');


// The `/api/users` endpoint
router.get('/session',(req,res)=>{

  if(req.session.loggedIn){
      res.status(200).json({
          data:{
              id:req.session.user_id,
              username:req.session.username,
              loggedIn:true
          }
      })
  }else{
      res.status(400).json({
          data:"guest user"
      })
  }
})
// get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get user by id
router.get('/:id', (req, res) => {
  console.log("*********************in *******************")
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    /*include: [
     /* {
        model: Posts,
        attributes: ['id', 'title', 'description']
      },
      {
        model: Comments,
        attributes: ['id', 'comment_text'],
          include: {
          model: Posts,
          attributes: ['title']
        }
      }
    ]*/
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Create users
// expects {username: 'avneet', email: 'savvy@gmail.com', password: 'password1234'}
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true; //remove these commentd when sessionis added
    
          res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

//find users based on email id 
// expects {email: 'savvy@gmail.com', password: 'password1234'}
router.post('/login',(req,res)=>{
  console.log("in login route")
  
  const email = req.body.email;
  const password = req.body.password

  console.log(req.body)
  User.findOne({
      where:{
          email:email
      }
  })
  .then(db=>{
      if(!db){
          res.status(400).json({ message: 'No user with that email address!' });
          return;
      }
      if(!db.checkPassword(password)){
          res.status(401).json({ message: 'Incorrect password!' });
          return;
      }
      req.session.save(() => {
          req.session.user_id = db.id;
          req.session.username = db.username;
          req.session.loggedIn = true;
          res.json({message: 'You are now logged in!' });
      })
    })
  })


//Update users base on id
router.put('/:id', (req, res) => {
  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Delete users based on id
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
