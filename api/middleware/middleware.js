function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  )

  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC

  
  next()
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