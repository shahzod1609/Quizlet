const express = require('express')
const imageUpload = require('../util/multer')
const multer = require('multer')
// const storage = multer.memoryStorage();
// const multipleUpload = multer().any();
const isAuth =  require('../middleware/auth')
const router = express.Router()
const folderControllers = require('../controllers/folder')
router.use(imageUpload.any())
// router.use(isAuth)
router.get('/folder', folderControllers.getFolder)

router.post('/folder',isAuth,folderControllers.postFolder)

//PUT module and all cards  
router.put('/module/:moduleid',isAuth, folderControllers.putModule)

//POST module and cards
router.post('/module',isAuth,folderControllers.postModule)

router.get('/module',folderControllers.getModule)

router.get('/cards/:moduleid',folderControllers.getCards)

router.post('/folder/addmodule/:folderid',isAuth,folderControllers.postFolMod)

router.get('/folder/:folderid',folderControllers.getFolderModules)

router.get('/search',folderControllers.search)

router.post('/test/:cardid',isAuth, folderControllers.postTest)

router.post('/add-module-id/:moduleid',isAuth,folderControllers.postAddModuleId)

router.get('/quiz/:moduleid',folderControllers.getQuizCards)

router.post('/quiz-result/:moduleid',isAuth,folderControllers.postQuizResult)


module.exports = router