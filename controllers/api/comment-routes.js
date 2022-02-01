const router = require('express').Router();
const { Comments, Categories,Posts, Users } = require('../../models');

// The `/api/comments` endpoint

// get all comments
router.get('/', (req, res) => {
  // find all comments
  // be sure to include its associated Category and Tag data
  Comments.findAll({
    include: [
      {
        model: Comments
      }
    ]
  })
  .then(commentsData => res.json(commentsData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// get one comments
router.get('/:id', (req, res) => {
  // find a single comment by its `id`, we can use with user id  as well, to user id to be added later

  Comments.findOne(req.params.id).then(commentsData => {
    if (!commentsData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(commentsData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// create new comment
router.post('/', (req, res) => {
  Comments.create(req.body)
    .then((newComment) => {
      res.json(newComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update comments
router.put('/:comment_id', (req, res) => {
  //Calls the update method on the Book model
  Comments.update(
    {
      // All the fields you can update and the data attached to the request body.// for now assuming only 2 fields in Comments table title and data
      title: req.body.title,
      data: req.body.data,
    },
    {
      // Gets a book based on the book_id given in the request parameters
      where: {
        comment_id: req.params.comment_id,
      },
    }
  )
    .then((updatedComment) => {
      res.json(updatedComment);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one comment by its `id` value
  Comments.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(commentData => {
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(commentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
