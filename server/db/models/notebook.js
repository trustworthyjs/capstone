const Sequelize = require('sequelize')
const db = require('../db')

const Notebook = db.define('notebook', {
  title: {
    type: Sequelize.STRING
  },
  cover: {
    type: Sequelize.ENUM,
    values: ['red', 'yellow', 'green', 'blue'],
    defaultValue: 'yellow'
  }
})

module.exports = Notebook
