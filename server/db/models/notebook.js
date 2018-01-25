const Sequelize = require('sequelize')
const db = require('../db')

const Notebook = db.define('notebook', {
  title: {
    type: Sequelize.STRING,
    defaultValue: 'Notebook ' + this.id
  },
  cover: {
    type: Sequelize.ENUM,
    values: ['#0000FF', '#008000', '#FF0000']
  }
})

module.exports = Notebook
