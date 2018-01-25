const router = require('express').Router()
const {Entry} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  Entry.create(req.body)
    .then(entry => res.json(entry))
    .catch(next)
})

