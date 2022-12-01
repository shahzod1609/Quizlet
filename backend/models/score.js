const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Score = sequelize.define('score',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true

    },
    totalNotLearning:{
        type:Sequelize.INTEGER,
    },
    totalPartLearning:{
        type:Sequelize.INTEGER,
    },
    totalFullLearning:{
        type:Sequelize.INTEGER,
    }
})

module.exports = Score