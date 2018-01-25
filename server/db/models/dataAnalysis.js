const Sequelize = require('sequelize')
const db = require('../db')

const DataAnalysis = db.define('dataAnalysis', {
  wcVerbs: {
    type: Sequelize.JSON
  },
  wcNouns: {
    type: Sequelize.JSON
  },
  wcTopics: {
    type: Sequelize.JSON
  },
  wcPeople: {
    type: Sequelize.JSON
  },
  entities: {
    type: Sequelize.JSON
  },
  tones: {
    type: Sequelize.JSON
  },
  personality: {
    type: Sequelize.JSON
  },
  needs: {
    type: Sequelize.JSON
  },
  values: {
    type: Sequelize.JSON
  }
})


module.exports = DataAnalysis
