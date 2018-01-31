const router = require('express').Router()
const {DataAnalysis} = require('../db/models')
let analyzeData = require('../../createDataFunc')
module.exports = router

router.get('/:userId', (req, res, next) => {
  DataAnalysis.findAll({
    limit: 1,
    where: {
      userId: req.params.userId
    },
    order: [[ 'updatedAt', 'DESC' ]]
  })
    .then(data => res.json(data))
    .catch(next)
})

router.post('/', (req, res, next) => {
  DataAnalysis.create(req.body)
    .then(entry => res.json(entry))
    .catch(next)
})

router.post('/nlp-api-data/:userId', (req, res, next) => {
  let userId = req.params.userId
  let entriesString = req.body.entriesString
  analyzeData('text', userId, null, null, entriesString)
    .then(dataObj => {
      res.json(dataObj)
    })
    .catch(next)
})
