const router = require('express').Router()
const {DataAnalysis} = require('../db/models')
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

