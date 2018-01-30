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
var fs = require('fs')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
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

  const notebooks = await Promise.all([
    Notebook.create({title: 'Notebook1', cover: '#0000FF', userId: 1}),
    Notebook.create({title: 'Notebook2', cover: '#008000', userId: 1}),
    Notebook.create({title: 'Notebook3', cover: '#FF0000', userId: 1}),
    Notebook.create({title: 'Notebook1', cover: '#FF0000', userId: 2}),
    Notebook.create({title: 'Notebook2', cover: '#008000', userId: 2}),
    Notebook.create({title: 'Notebook3', cover: '#008000', userId: 2}),
    Notebook.create({title: 'Notebook4', cover: '#0000FF', userId: 2})
  ])

  console.log(`seeded ${notebooks.length} notebooks`)

  const entries = await Promise.all([
    Entry.create({content: txt1, mode: 'freeWrite', notebookId: 1, userId: 1, savedAt: '2017-12-26 11:49:31.029-06', 'submitted': 'true'}),
    Entry.create({content: txt2, mode: 'mindfulJournal', notebookId: 1, userId: 1, savedAt: '2017-10-26 11:49:31.029-06', 'submitted': 'true'}),
    Entry.create({content: txt3, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2017-10-26 11:49:31.029-06', 'submitted': 'true'}),
    Entry.create({content: txt4, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2017-10-27 11:49:31.029-06', 'submitted': 'true'}),
    Entry.create({content: txt5, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2017-10-27 11:49:31.029-06', 'submitted': 'true'}),
    Entry.create({content: txt6, mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2017-10-27 11:49:31.029-06', 'submitted': 'true'}),
    Entry.create({content: txt7, mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2017-11-07 11:49:31.029-06', 'submitted': 'true'}),
    Entry.create({content: txt8, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2017-11-07 11:49:31.029-06', 'submitted': 'true'}),
    Entry.create({content: txt9, mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2017-11-09 11:49:31.029-06', 'submitted': 'true'}),
    Entry.create({content: txt10, mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2017-11-10 11:49:31.029-06', 'submitted': 'true'}),
    Entry.create({content: txt11, mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2017-12-21 11:49:31.029-06', 'submitted': 'true'}),
    Entry.create({content: txt12, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2017-12-22 11:49:31.029-06', 'submitted': 'true'}),
    Entry.create({content: txt13, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2018-01-01 11:49:31.029-06', 'submitted': 'true'}),
    Entry.create({content: txt14, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2018-01-02 11:49:31.029-06', 'submitted': 'true'}),
    Entry.create({content: txt15, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2018-01-03 11:49:31.029-06', 'submitted': 'true'}),
  ])

  entries.map(async (entry) => {
    let tonesObj = await toneFunc(entry.id, entry.content)
    return entry.update({
      tones: tonesObj
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
  ])

  console.log(`seeded ${dataAnalysisInstances.length} data analyses`)

}


// ******************* DATA ANALYSIS API CALLS END *********************

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
