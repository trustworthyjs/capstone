const router = require('express').Router()
const {DataAnalysis} = require('../db/models')
let analyzeData = require('../../createDataFunc')
let toneData = require('../../createToneFunc')
module.exports = router

router.get('/:userId', (req, res, next) => {
  DataAnalysis.findOne({
    where: {
      userId: req.params.userId
    }
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

router.post('/nlp-api-data/entry/:entryId', (req, res, next) => {
  let entryId = req.params.entryId
  let entryString = req.body.entryString
  toneData(entryId, entryString)
    .then(dataObj => {
      res.json(dataObj)
    })
    .catch(next)
})
