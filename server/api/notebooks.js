const router = require('express').Router()
const {Notebook, Entry} = require('../db/models')
module.exports = router

//create a new notebook
router.post('/', async (req, res, next) => {
  try {
    let entry = await Notebook.create(req.body)
    if (+req.session.passport.user){
      await entry.setUser()
    }
    res.json(entry)
  }
  catch (error) {
    next(error)
  }
})

//get all entries of a single notebook
router.get(`/:notebookId`, async (req, res, next) => {
  try {
    let entriesInNotebook = await Notebook.findAll({
      where: {
        id: +req.params.notebookId
      },
      include: [{
        model: Entry,
        attributes: ['id', 'title', 'mode', 'createdAt', 'notebookId']
      }]
    })
    res.json(entriesInNotebook)
  }
  catch (error){
    next(error)
  }
})

//get all notebooks for a single user (with entries nested)
router.get(`/user/:userId`, async (req, res, next) => {
  try {
    let userNotebooksEntries = await Notebook.findAll({
      where: {
        userId: +req.params.userId
      },
      include: [{
        model: Entry,
        attributes: ['id', 'title', 'mode', 'createdAt', 'updatedAt', 'notebookId']
      }]
    })
    res.json(userNotebooksEntries)
  }
  catch (error) {
    next(error)
  }
})
