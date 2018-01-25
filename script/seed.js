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
const fs = require('fs')

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

  const notebooks = await Promise.all([
    Notebook.create({cover: '#0000FF', userId: 1}),
    Notebook.create({cover: '#008000', userId: 2})
  ])

  console.log(`seeded ${notebooks.length} entries`)

  const entries = await Promise.all([
    Entry.create({content: txt1, mode: 'freeWrite', notebookId: 1}),
    Entry.create({content: txt2, mode: 'mindfulWrite', notebookId: 2})
  ])

  console.log(`seeded ${entries.length} entries`)



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
