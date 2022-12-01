//Login, Signup


const express = require('express')

const router = express.Router()

const authControllers = require('../controllers/auth')
const Auth = require('../models/auth')
const {body} = require('express-validator/check')
const imageUpload = require('../util/multerAvatar')


//Login


router.post('/login',  
[
    body('password')
        .notEmpty()
        .withMessage('password should not be emtpy')
        .isLength({min:4,max:64})
        .withMessage('Invalid length')
        .matches(/^[~A-Za-z0-9/./_/-]*$/)
        .withMessage('invalid characters')
        .custom((value,{req})=>{
            return Auth
                .findOne({where:{password:value,email:req.body.email}})
                .then(userDoc=>{
                    if(!userDoc){
                        return Promise.reject('Invalid email or password')
                    }
                })    
        }),
    body('email')
        .notEmpty()
        .withMessage('email should not be empty')
        .isEmail()
        .withMessage('Please enter a valid email')        
        .custom((value,{req})=>{
            return Auth
                .findOne({where:{email:value,password:req.body.password}})
                .then(userDoc=>{
                    if(!userDoc){
                        return Promise.reject('Invalid email or password')
                    }
                })    
        })
        .normalizeEmail()
]
,authControllers.postLogin)

router.put('/signup', 
    imageUpload.single('image'),
    body('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('name should not be empty'),
    body('email')
        .notEmpty()
        .withMessage('email should not be empty')
        .isEmail()
        .withMessage('Please enter a valid email')        
        .custom((value,{req})=>{
            return Auth
                .findOne({where:{email:value}})
                .then(userDoc=>{
                    if(userDoc){
                        return Promise.reject('E-Mail address already exists!')
                    }
                })    
        })
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('password should not be emtpy')
        .isLength({min:4,max:64})
        .withMessage('Invalid length')
        .matches(/^[~A-Za-z0-9/./_/-]*$/)
        .withMessage('invalid characters'),
    body('confirmPassword')
        .notEmpty()
        .withMessage('confirm-password should not be emtpy')
        .custom((value,{req}) =>{
            if(value !== req.body.password){
                return Promise.reject('Password confirmation does not match with password') 
                //ELLEME DOSS HAYYSS!!!!!!
            }else{
                return true
            }
        })
,authControllers.putSignup)

router.get('/signup',authControllers.getSignup)

router.post('/logout',authControllers.postLogout)

module.exports = router



