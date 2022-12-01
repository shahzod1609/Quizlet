const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    try {
        
        if(!req.headers.authorization  || !req.headers.authorization.startsWith('Bearer')){
            next(err)
        }
        const token = req.headers.authorization.split(' ')[1]; //Authorization : 'Bearer TOKEN'
        if(!token)
            throw err;
        const decodedToken = jwt.verify(token,'do not say our secret okay')
        req.userId = {userId:decodedToken.id}
        next()
    } catch (err) {
        next(err)
    } 

}