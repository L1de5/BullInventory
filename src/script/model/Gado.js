const db = require('../db')
const Produtores = require('./Produtores')

const Gado = db.sequelize.define('Gado',{
    numero:{
        type:db.Sequelize.INTEGER,
        unique: true,
        allowNull: true       
    },
    nascimento:{
        type:db.Sequelize.DATEONLY
    },
    pelagem:{
        type:db.Sequelize.STRING
    },
    potreiro:{
        type:db.Sequelize.STRING
    }
})

Produtores.hasOne(Gado)
Gado.hasOne(Gado, {
    foreignKey: "maeId",
  });

// Gado.sync({force:true})

module.exports= Gado