const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatesToUser = req.body
    const user = await User.findById(req.params.id);
    const updatedUser = await user.update(updatesToUser);
    res.json(updatedUser)
  } catch(err) {
    next(err);
  }
})

