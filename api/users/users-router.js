const express = require('express');
const users = require('./users-model')
const posts = require('../posts/posts-model')
const {validatePost, validateUser, validateUserId} = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  users.get()
  .then(users => res.json(users))
  .catch(err => {
    res.status(500).json({
      message: 'error bebe',
    err: err.message,
    stack: err.stack,
    })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  
  users.getById(req.params.id)
  .then(user => {
    res.json(user)
})
  .catch(err => {
    res.status(500).json({
      message: 'error bebe',
    err: err.message,
    stack: err.stack,
    })
  })
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const user = req.body
  users.insert(user)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    res.status(500).json({
      message: 'error bebe',
    err: err.message,
    stack: err.stack,
    })
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const {id} = req.params
  const user = req.body
  users.update(id, user)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    res.status(500).json({
      message: 'error bebe',
    err: err.message,
    stack: err.stack,
    })
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  users.remove(req.params.id)
  .then(user => res.json(user))
  .catch(err => {
    res.status(500).json({
      message: 'error bebe',
    err: err.message,
    stack: err.stack,
    })
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  posts.getById(req.params.id)
  .then(posts => res.json(posts))
  .catch(err => {
    res.status(500).json({
      message: 'error bebe',
    err: err.message,
    stack: err.stack,
    })
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const post = req.body
  post.insert(post)
  .then(post => res.status(201).json(post))
  .catch(err => {
    res.status(500).json({
      message: 'error bebe',
    err: err.message,
    stack: err.stack,
    })
  })
});

// do not forget to export the router

module.exports = router;