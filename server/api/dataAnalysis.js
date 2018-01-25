const router = require('express').Router()
const {DataAnalysis} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  DataAnalysis.create(req.body)
    .then(entry => res.json(entry))
    .catch(next)
})

