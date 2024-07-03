const users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  )

  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  users.getById(req.params.id)
  .then(user => {
    if(!user){ res.status(404).json({message: "user not found" })}
    else
  req.user = user
 next()
  })
  .catch(err => {
    res.status(500).json({
      message: 'error bebe',
    err: err.message,
    stack: err.stack,
    })
  })
 
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC

  const user = req.body

  if (!user.name || user.name.length <= 0){ res.status(400)
    .json({message:"missing required name field" })} 
  else
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC

  const post = req.body

  if (!post.text || post.text.length <= 0){ res.status(400)
    .json({message:"missing required text field" })} 
  else
  next()
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUser,
  validateUserId,
  validatePost
}