function errorHandler(res) {
  let msg = ''
  if (typeof res.data.errors.message === 'object') {
    res.data.errors.message.forEach(errMsg => (
      msg += `${errMsg} <br/>`
    ))
  } else {
    msg = res.data.errors.message
  }
  return msg
}

export default errorHandler