const router = require('express').Router()
const {Entry} = require('../db/models')
module.exports = router

//get single entry from database
router.get(`/:entryId`, async (req, res, next) => {
  try {
    let foundEntry = await Entry.findOne({
      where: {
        id: req.params.entryId
      }
    })
    res.json(foundEntry)
  }
  catch (error){
    next(error)
  }
})


//save a new entry to the database
router.post('/', async (req, res, next) => {
  try {
    let toCreate = req.body
    let entryCreated = await Entry.create({
      title: toCreate.title,
      content: toCreate.content,
      formattedContent: toCreate.formattedContent,
      mode: toCreate.mode
    })
    console.log('reqbody', toCreate)
    if (toCreate.notebookId){
      await entryCreated.setNotebook(+toCreate.notebookId)
      console.log('entry created', entryCreated)
    }
    res.json(entryCreated)
  }
  catch (error){
    next(error)
  }
})

//save an entry that already exists
router.put('/:entryId', async (req, res, next) => {
  try {
    let editedEntry  = req.body
    let [numAffected, savedEntry] = await Entry.update(editedEntry, {
      where: {
        id: req.params.entryId
      },
      returning: true,
      plain: true
    })
    res.json(savedEntry)
  }
  catch (error){
    next(error)
  }
})
