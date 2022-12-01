const errorHandler = (err,req, res, next) => {
    console.log(err.message,'error')
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message
    })
    next()
}

module.exports = errorHandler