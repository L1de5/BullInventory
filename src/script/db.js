const Sequelize = require("sequelize")

const sequelize = new Sequelize("bullinv", "root", "prestes", {
    host:'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}