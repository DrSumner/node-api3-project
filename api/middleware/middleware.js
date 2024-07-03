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
    if(user){
      req.user = user
      next() }
    else
    res.status(404).json({message: "user not found" })
 
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

  if (!user.name || user.name.length <= 0){ return res.status(400)
    .json({message:"missing required name field" })} 
  
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC

  const {text} = req.body

  if (!text || text.length === 0){ return res.status(400)
    .json({message:"missing required text field" })} 
  
  next()
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUser,
  validateUserId,
  validatePost
}