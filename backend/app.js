const express = require('express')
const bodyParser = require('body-parser')
// const session = require('express-session')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const folderRoutes = require('./routes/folder')
// const multer = require('multer')
const app = express()
const helmet = require('helmet')
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./util/database')
const fs = require('fs')
const Auth = require('./models/auth')
const Module = require('./models/module')
const Card = require('./models/Cards')
const Folder = require('./models/folder')
const userModule = require('./models/userModule')
const Score = require('./models/score')
const path = require('path')
const errorHandler = require('./middleware/error')

// app.use(express.json())
// app.use(express.urlencoded({extended : false, }));

// const sessionStore = new SequelizeStore({
//    db: sequelize
// });

// app.use(session({
//     secret:'somesupersecretsecret',
//     resave:false,
//     saveUninitialized:false,
//     store:sessionStore
// }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors())
app.use(helmet())

Auth.hasMany(Module)   //userId in Module
Module.belongsTo(Auth)

Auth.hasMany(Folder)   // userId in Folder

userModule.hasMany(Score)    //userId in userModule

Auth.hasMany(userModule) //userId in userModule table
userModule.belongsTo(Auth)

Module.hasMany(userModule) //moduleId in userModule table
userModule.belongsTo(Module)


userModule.hasMany(Card) //moduleId in userModule Table

Folder.hasMany(userModule) //folderId in userModule Table
userModule.belongsTo(Folder)

// app.use((req,res,next)=>{

app.use('/auth', authRoutes)
app.use('/admin', folderRoutes)
app.use(errorHandler)

let module1, folder, auth

sequelize
    .sync()
    // .sync({force:true})
    // .sync({alter:true})
    .then(() => {
        app.listen(8080, (err => {
            console.log(err)
        }))
    })
    .catch(err => {
        console.log(err)
    })