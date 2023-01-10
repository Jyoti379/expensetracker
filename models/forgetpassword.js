const Sequelize = require('sequelize');

const sequelize = require('../utill/database');

const Forgetpassword = sequelize.define('forgetpassword', {
    id: {
        type: Sequelize.UUID,  
        allowNull: false,
        primaryKey: true
    },
    active: Sequelize.BOOLEAN,
    expiresby: Sequelize.DATE
})

module.exports = Forgetpassword;