const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Module = sequelize.define('module',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true

    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING
    },
    totalCards:{
        type:Sequelize.INTEGER
    }
})

module.exports = Module


/*
user    | id email password createdAt updatedAt
quiz    | id quizName word defintion wordLanguage defLanguage imageUrl userId
*/
