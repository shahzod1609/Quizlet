const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Folder = sequelize.define('folder',{
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
        type:Sequelize.STRING,
    },
    totalModule:{
        type:Sequelize.INTEGER,
    }

})

module.exports = Folder