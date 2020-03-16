const jwtError = [
  'TokenExpiredError',
  'JsonWebTokenError',
  'NotBeforeError'
]

let statusCode, message
module.exports = (err, req, res, next) => {
  const stringifiedError = JSON.stringify(err)
  if (jwtError.includes(err.name)) {
    statusCode = 400,
    message = 'Invalid access token'
  } else if (stringifiedError.includes('ValidatorError')) {
    const mongooseError = err.errors
    statusCode = 400
    message  = []
    for (let key in mongooseError) {
      message.push(mongooseError[key].message)
    }
  } else {
    statusCode = err.statusCode || 500
    message = err.message || 'Internal server error'
  }
  console.log(err, '<<<')
  res.status(statusCode).json({ errors: { message } })
}