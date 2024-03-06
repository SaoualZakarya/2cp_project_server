const errorHandler = (err, req, res, next) => {
    const errorObject = {
      name: err.name,
      message: err.message,
      status: res.statusCode,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null 
    }
    res.json(errorObject)
  }
  
export default errorHandler