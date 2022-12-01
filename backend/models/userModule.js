const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const userModule = sequelize.define('usermodule',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    test:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }
})

module.exports = userModule