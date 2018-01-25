const router = require('express').Router()
const {Notebook} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  Notebook.create(req.body)
    .then(entry => res.json(entry))
    .catch(next)
})

