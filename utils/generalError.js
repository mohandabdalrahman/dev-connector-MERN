const handleGeneralError = (res, error, code) => {
  return res.status(code).json({
    success: false,
    error
  })
}

module.exports = {
  handleGeneralError
}