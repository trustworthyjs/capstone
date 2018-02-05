const router = require('express').Router()
const {Entry, User} = require('../db/models')
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
    if (toCreate.notebookId){
      await entryCreated.setNotebook(+toCreate.notebookId)
    }
    if (req.session.passport.user){
      await entryCreated.setUser(+req.session.passport.user)
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
    if (savedEntry.submitted && savedEntry.tones === null){ //if it was submitted and this is the 1st put request
      let user = await User.findOne({
        where: {
          id: req.session.passport.user
        }
      })
      let today = new Date();
      today.setHours(23, 59, 59, 0)
      ///check if goals is ON
      if(user.streakGoalDate && user.streakGoalDate >= today){ //if we're within range
      if (user.currentStreak === 0){ //if no current streak
        user.update({
          currentStreak: 1
        })
      } else if (user.currentStreak >= 1) { //if existing streak
        let yesterday = new Date()
        yesterday.setDate(today.getDate() - 1)
        yesterday.setHours(23, 59, 59, 0)
        yesterday = yesterday.toLocaleDateString() //find yesterday, get rid of time
        today = today.toLocaleDateString() //get rid of time
          let allEntries = await Entry.findAll({ //find all entries submitted
            where: {
              userId: user.id,
              submitted: true
            },
            attributes: ['savedAt']
          })
          let entriesSorted = []
          allEntries.forEach((entry) => {
            entriesSorted.push(Number(entry.savedAt)) //only grab the savedAt date from entry into array
          })
          let converted = entriesSorted.sort().map((entry) => {
            return new Date(entry).toLocaleDateString()
          }) //get rid of times and sort
          if (converted.filter(entry => entry === today).length === 1){ //if this is the first entry today
            console.log('this is the first entry today')
            let omitToday = converted.filter(entryDate => entryDate !== today) //get entries excluding today
            let mostRecentEntry = omitToday[omitToday.length - 1]
            let newStreak;
            if (mostRecentEntry == yesterday){ //if the next most recent entry was submitted yesterday
              console.log('most recent was yesterday')
              let previousCurrentStreak = user.currentStreak
              newStreak = previousCurrentStreak + 1
            } else {
              console.log('streak reset because most recent was not yesterday')
              newStreak = 1 //if most recent was not yesterday, reset to 1
            }
            let updated = await user.update({
              currentStreak: newStreak
            })
          }
          //if entries were already made today, dont do anything
        }
      } else { //if we're not within range reset to 1
        let updated = await user.update({
          currentStreak: 1,
          maxStreak: 1
        })
      }
    }
    res.json(savedEntry)
  }
  catch (error){
    next(error)
  }
})

//get all entries for a single user
router.get(`/user/:userId`, async (req, res, next) => {
  try {
    let userEntries = await Entry.findAll({
      where: {
        userId: +req.params.userId
      }
    })
    res.json(userEntries)
  }
  catch (error) {
    next(error)
  }
})
