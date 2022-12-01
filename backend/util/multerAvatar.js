const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
    destination:'images/avatar',
    filename:(req,file,cb) => {
        cb(null,new Date().toISOString().replace(/:/g, "-")+'_'+file.originalname)
    }
})

const imageUpload = multer({
    storage:imageStorage,
    fileFilter(req,file,cb){
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
          ) {
            cb(null, true);
          } else {
            cb(null, false);
          }
    }
})


module.exports = imageUpload
