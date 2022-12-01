const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Cards = sequelize.define('card',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    term:{
        type:Sequelize.STRING,
        allowNull:false
    },
    definition:{
        type:Sequelize.STRING
    },
    image:{
        type:Sequelize.STRING
    },
    learn:{
        type:Sequelize.INTEGER,
        defaultValue:null
    }
})

module.exports = Cards