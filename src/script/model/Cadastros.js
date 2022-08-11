const db = require('../db')

const Cadastros = db.sequelize.define('Cadastros',{
    nome:{
        type:db.Sequelize.STRING
    },
    senha:{
        type:db.Sequelize.STRING
    }
})

module.exports= Cadastros