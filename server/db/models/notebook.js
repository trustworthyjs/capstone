const Sequelize = require('sequelize')
const db = require('../db')

const Notebook = db.define('notebook', {
  title: {
    type: Sequelize.STRING
  },
  cover: {
    type: Sequelize.ENUM,
    values: ['#0000FF', '#008000', '#FF0000'],
    defaultValue: '#0000FF'
  }
})

module.exports = Notebook
