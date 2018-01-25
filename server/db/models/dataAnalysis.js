const Sequelize = require('sequelize')
const db = require('../db')

const DataAnalysis = db.define('dataAnalysis', {
  wcVerbs: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  },
  wcNouns: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  },
  wcTopics: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  },
  wcPeople: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  },
  entities: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  },
  tones: {
    type: Sequelize.JSON
  },
  personality: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  },
  needs: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  },
  values: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  },
  keywords: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  },
  concepts: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  }
})


module.exports = DataAnalysis
