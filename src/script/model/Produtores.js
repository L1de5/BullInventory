const db = require('../db')

const Produtores = db.sequelize.define('Produtores',{
    nome:{
        type:db.Sequelize.STRING
    },
    marca:{
        type:db.Sequelize.STRING
    }
})

module.exports= Produtores