const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Auth = sequelize.define('user',{
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    image:{
        type:Sequelize.STRING
    }
})

module.exports = Auth