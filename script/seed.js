/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Entry, Notebook, DataAnalysis} = require('../server/db/models')
const analyzeData = require('../createDataFunc')
const toneFunc = require('../createToneFunc')
const personalityFunc = require('../createPersonalityFunc')
const nounFunc = require('../createNounsFunc')
var fs = require('fs')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'lizzy@email.com', password: '123', streakGoalDate: new Date('April 17, 2018'), streakGoalStart: new Date('January 30, 2018'), currentStreak: 10, maxStreak: 10})
  ])

  users.map(async (user) => {
    if (user.email === 'lizzy@email.com'){
      return user.update({
        streakGoalStart: new Date('January 30, 2018')
      })
    }
  })

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  var buffer1 = fs.readFileSync(__dirname + '/sampleEntry1.txt');
  var txt1 = buffer1.toString();
  var buffer2 = fs.readFileSync(__dirname + '/sampleEntry2.txt');
  var txt2 = buffer2.toString();
  var buffer3 = fs.readFileSync(__dirname + '/sampleEntry3.txt');
  var txt3 = buffer3.toString();
  var buffer4 = fs.readFileSync(__dirname + '/sampleEntry4.txt');
  var txt4 = buffer4.toString();
  var buffer5 = fs.readFileSync(__dirname + '/sampleEntry5.txt');
  var txt5 = buffer5.toString();
  var buffer6 = fs.readFileSync(__dirname + '/sampleEntry6.txt');
  var txt6 = buffer6.toString();
  var buffer7 = fs.readFileSync(__dirname + '/sampleEntry7.txt');
  var txt7 = buffer7.toString();
  var buffer8 = fs.readFileSync(__dirname + '/sampleEntry8.txt');
  var txt8 = buffer8.toString();
  var buffer9 = fs.readFileSync(__dirname + '/sampleEntry9.txt');
  var txt9 = buffer9.toString();
  var buffer10 = fs.readFileSync(__dirname + '/sampleEntry10.txt');
  var txt10 = buffer10.toString();
  var buffer11 = fs.readFileSync(__dirname + '/sampleEntry11.txt');
  var txt11 = buffer11.toString();
  var buffer12 = fs.readFileSync(__dirname + '/sampleEntry12.txt');
  var txt12 = buffer12.toString();
  var buffer13 = fs.readFileSync(__dirname + '/sampleEntry13.txt');
  var txt13 = buffer13.toString();
  var buffer14 = fs.readFileSync(__dirname + '/sampleEntry14.txt');
  var txt14 = buffer14.toString();
  var buffer15 = fs.readFileSync(__dirname + '/sampleEntry15.txt');
  var txt15 = buffer15.toString();
  var buffer16 = fs.readFileSync(__dirname + '/sampleEntry16.txt');
  var txt16 = buffer16.toString();
  var buffer17 = fs.readFileSync(__dirname + '/sampleEntry17.txt');
  var txt17 = buffer17.toString();
  var buffer18 = fs.readFileSync(__dirname + '/sampleEntry18.txt');
  var txt18 = buffer18.toString();
  var buffer19 = fs.readFileSync(__dirname + '/sampleEntry19.txt');
  var txt19 = buffer19.toString();
  var buffer20 = fs.readFileSync(__dirname + '/sampleEntry20.txt');
  var txt20 = buffer20.toString();
  var buffer21 = fs.readFileSync(__dirname + '/sampleEntry21.txt');
  var txt21 = buffer21.toString();
  var buffer22 = fs.readFileSync(__dirname + '/sampleEntry22.txt');
  var txt22 = buffer22.toString();
  var bufferDummy = fs.readFileSync(__dirname + '/dummyEntries.txt');
  var txtDummy = bufferDummy.toString();

  const notebooks = await Promise.all([
    Notebook.create({title: 'Diary', cover: 'yellow', userId: 1}),
    Notebook.create({title: 'My Book', cover: 'red', userId: 1}),
    Notebook.create({title: 'Snippets', cover: 'green', userId: 1}),
    Notebook.create({title: 'My Travels', cover: 'blue', userId: 2}),
    Notebook.create({title: 'More Travels', cover: 'yellow', userId: 2}),
    Notebook.create({title: 'Ideas', cover: 'blue', userId: 2}),
    Notebook.create({title: 'Thoughts About Movies', cover: 'green', userId: 2})
  ])

  console.log(`seeded ${notebooks.length} notebooks`)

  const entries = await Promise.all([
    Entry.create({content: txt1, mode: 'freeWrite', notebookId: 1, userId: 1, savedAt: '2018-01-16 11:49:31.029-06', 'submitted': 'true', 'title': 'College Days'}),
    Entry.create({content: txt2, mode: 'freeWrite', notebookId: 1, userId: 1, savedAt: '2018-01-20 11:49:31.029-06', 'submitted': 'true', 'title': 'Home in 1957'}),
    Entry.create({content: txt3, mode: 'mindfulJournal', notebookId: 4, userId: 2, savedAt: '2018-01-02 11:49:31.029-06', 'submitted': 'true', 'title': 'Exchange Student'}),
    Entry.create({content: txt4, mode: 'mindfulJournal', notebookId: 4, userId: 2, savedAt: '2018-01-10 11:49:31.029-06', 'submitted': 'true', 'title': 'Food Diary'}),
    Entry.create({content: txt5, mode: 'mindfulJournal', notebookId: 4, userId: 2, savedAt: '2018-01-10 11:49:31.029-06', 'submitted': 'true', 'title': 'Paris!!!'}),
    Entry.create({content: txt6, mode: 'mindfulJournal', notebookId: 4, userId: 2, savedAt: '2018-01-19 11:49:31.029-06', 'submitted': 'true', 'title': 'Window Shopping'}),
    Entry.create({content: txt7, mode: 'mindfulJournal', notebookId: 4, userId: 2, savedAt: '2018-01-19 11:49:31.029-06', 'submitted': 'true', 'title': 'Tips from a Local'}),
    Entry.create({content: txt8, mode: 'mindfulJournal', notebookId: 4, userId: 2, savedAt: '2018-01-19 11:49:31.029-06', 'submitted': 'true', 'title': 'Malasana'}),
    Entry.create({content: txt9, mode: 'mindfulJournal', notebookId: 4, userId: 2, savedAt: '2018-01-30 11:49:31.029-06', 'submitted': 'true', 'title': 'Music and Songs'}),
    Entry.create({content: txt10, mode: 'mindfulJournal', notebookId: 4, userId: 2, savedAt: '2018-01-31 11:49:31.029-06', 'submitted': 'true', 'title': 'Ireland'}),
    Entry.create({content: txt11, mode: 'mindfulJournal', notebookId: 4, userId: 2, savedAt: '2018-02-01 11:49:31.029-06', 'submitted': 'true', 'title': 'My Birthday'}),
    Entry.create({content: txt12, mode: 'mindfulJournal', notebookId: 4, userId: 2, savedAt: '2018-02-02 11:49:31.029-06', 'submitted': 'true', 'title': 'British Slang'}),
    Entry.create({content: txt13, mode: 'mindfulJournal', notebookId: 4, userId: 2, savedAt: '2018-02-03 11:49:31.029-06', 'submitted': 'true', 'title': 'New Job'}),
    Entry.create({content: txt14, mode: 'mindfulJournal', notebookId: 4, userId: 2, savedAt: '2018-02-04 11:49:31.029-06', 'submitted': 'true', 'title': 'Lisbon'}),
    Entry.create({content: txt15, mode: 'mindfulJournal', notebookId: 4, userId: 2, savedAt: '2018-02-04 11:49:31.029-06', 'submitted': 'true', 'title': 'Barcelona'}),
    Entry.create({content: txt16, mode: 'mindfulJournal', notebookId: 4, userId: 2, savedAt: '2018-02-04 11:49:31.029-06', 'submitted': 'true', 'title': 'Berlin'}),
    Entry.create({content: txt17, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2018-02-05 11:49:31.029-06', 'submitted': 'true', 'title': 'London'}),
    Entry.create({content: txt18, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2018-02-06 11:49:31.029-06', 'submitted': 'true', 'title': 'Backpacking'}),
    Entry.create({content: txt19, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2018-02-07 11:49:31.029-06', 'submitted': 'true', 'title': 'Things I Miss'}),
    Entry.create({content: txt20, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2018-02-08 11:49:31.029-06', 'submitted': 'true', 'title': '10 Months Later!'}),
    Entry.create({content: txt21, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2018-02-08 11:49:31.029-06', 'submitted': 'true', 'title': 'New Year'}),
    //these are dummy entries for filling up the streaks graph and are not seeded in 'data analysis'
    Entry.create({content: txt6.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-01 11:49:31.029-06', 'submitted': 'true', 'title': 'Hello World'}),
    Entry.create({content: txt5.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-02 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt4.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-02 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt7.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-02 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt9.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-02 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt3.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-03 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt2.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-03 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt10.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-05 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt8.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-06 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt11.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-06 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt13.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-06 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt14.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-06 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt19.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-07 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt16.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-08 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt15.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-09 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt20.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-09 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt18.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-10 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt17.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-14 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt12.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-14 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt21.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-15 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt1.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-16 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt7.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-17 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt3.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-17 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt2.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-17 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt4.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-18 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt6.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-19 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt22.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-21 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt5.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-22 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt9.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-23 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt10.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-25 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt12.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-25 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt11.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-25 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt13.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-25 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt8.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-25 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt16.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-25 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt17.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-26 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt18.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-25 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt15.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-25 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
    Entry.create({content: txt14.slice(0, 700), mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2018-01-28 11:49:31.029-06', 'submitted': 'true', 'title': 'Back and Stressin'}),
  ])

  entries.map(async (entry) => {
    let tonesObj = await toneFunc(entry.id, entry.content)
    let personalityObj = await personalityFunc(entry.id, entry.content)
    let nounsObj = await nounFunc(entry.content)

    return entry.update({
      tones: tonesObj.tones,
      personality: personalityObj,
      wcNouns: nounsObj
    })
  })

  console.log(`seeded ${entries.length} entries`)

  const dataAnalysisObj1 = await analyzeData('file', 1, 'sampleEntry1.txt', '/script')
  const dataAnalysisObj2 = await analyzeData('file', 1, 'sampleEntry2.txt', '/script')
  const dataAnalysisObj3 = await analyzeData('file', 2, 'sampleEntry3.txt', '/script')
  const dataAnalysisObj4 = await analyzeData('file', 2, 'sampleEntry4.txt', '/script')
  const dataAnalysisObj5 = await analyzeData('file', 2, 'sampleEntry5.txt', '/script')
  const dataAnalysisObj6 = await analyzeData('file', 2, 'sampleEntry6.txt', '/script')
  const dataAnalysisObj7 = await analyzeData('file', 2, 'sampleEntry7.txt', '/script')
  const dataAnalysisObj8 = await analyzeData('file', 2, 'sampleEntry8.txt', '/script')
  const dataAnalysisObj9 = await analyzeData('file', 2, 'sampleEntry9.txt', '/script')
  const dataAnalysisObj10 = await analyzeData('file', 2, 'sampleEntry10.txt', '/script')
  const dataAnalysisObj11 = await analyzeData('file', 2, 'sampleEntry11.txt', '/script')
  const dataAnalysisObj12 = await analyzeData('file', 2, 'sampleEntry12.txt', '/script')
  const dataAnalysisObj13 = await analyzeData('file', 2, 'sampleEntry13.txt', '/script')
  const dataAnalysisObj14 = await analyzeData('file', 2, 'sampleEntry14.txt', '/script')
  const dataAnalysisObj15 = await analyzeData('file', 2, 'sampleEntry15.txt', '/script')
  const dataAnalysisObj16 = await analyzeData('file', 2, 'sampleEntry16.txt', '/script')
  const dataAnalysisObj17 = await analyzeData('file', 2, 'sampleEntry17.txt', '/script')
  const dataAnalysisObj18 = await analyzeData('file', 2, 'sampleEntry18.txt', '/script')
  const dataAnalysisObj19 = await analyzeData('file', 2, 'sampleEntry19.txt', '/script')
  const dataAnalysisObj20 = await analyzeData('file', 2, 'sampleEntry20.txt', '/script')
  const dataAnalysisObj21 = await analyzeData('file', 2, 'sampleEntry21.txt', '/script')
  const dataAnalysisObj22 = await analyzeData('file', 2, 'sampleEntry22.txt', '/script')


  const dataAnalysisInstances = await Promise.all([
    DataAnalysis.create(dataAnalysisObj1),
    DataAnalysis.create(dataAnalysisObj2),
    DataAnalysis.create(dataAnalysisObj3),
    DataAnalysis.create(dataAnalysisObj4),
    DataAnalysis.create(dataAnalysisObj5),
    DataAnalysis.create(dataAnalysisObj6),
    DataAnalysis.create(dataAnalysisObj7),
    DataAnalysis.create(dataAnalysisObj8),
    DataAnalysis.create(dataAnalysisObj9),
    DataAnalysis.create(dataAnalysisObj10),
    DataAnalysis.create(dataAnalysisObj11),
    DataAnalysis.create(dataAnalysisObj12),
    DataAnalysis.create(dataAnalysisObj13),
    DataAnalysis.create(dataAnalysisObj14),
    DataAnalysis.create(dataAnalysisObj15),
    DataAnalysis.create(dataAnalysisObj16),
    DataAnalysis.create(dataAnalysisObj17),
    DataAnalysis.create(dataAnalysisObj18),
    DataAnalysis.create(dataAnalysisObj19),
    DataAnalysis.create(dataAnalysisObj20),
    DataAnalysis.create(dataAnalysisObj21),
    DataAnalysis.create(dataAnalysisObj22),
  ])

  console.log(`seeded ${dataAnalysisInstances.length} data analyses`)

}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
