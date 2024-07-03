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
    res.json(req.user)
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
  let deletedUser
  console.log(req.params.id)
  users.getById(req.params.id)
  .then(user => { deletedUser = user})
  
  users.remove(req.params.id)
  .then(user => res.json(deletedUser))
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
  const {id} = req.params
  posts.get()
  .then(posts => {
    const userPosts = posts.filter( post => post.user_id == id )
    res.json(userPosts)
  })
  .catch(err => {
    res.status(500).json({
      message: 'error bebe',
    err: err.message,
    stack: err.stack,
    })
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {

  const {text} = req.body
  const {id} = req.params
  const post = {
  user_id : id,
  text : text}
  posts.insert(post)
  .then(newPost => {
    res.status(201).json(newPost)
  })
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