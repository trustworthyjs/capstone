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
require('../secrets')

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
    Entry.create({content: txt1, mode: 'freeWrite', notebookId: 1, userId: 1, savedAt: '2017-12-26 11:49:31.029-06'}),
    Entry.create({content: txt2, mode: 'mindfulJournal', notebookId: 1, userId: 1, savedAt: '2017-10-26 11:49:31.029-06'}),
    Entry.create({content: txt3, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2017-10-26 11:49:31.029-06'}),
    Entry.create({content: txt4, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2017-10-27 11:49:31.029-06'}),
    Entry.create({content: txt5, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2017-10-27 11:49:31.029-06'}),
    Entry.create({content: txt6, mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2017-10-27 11:49:31.029-06'}),
    Entry.create({content: txt7, mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2017-11-07 11:49:31.029-06'}),
    Entry.create({content: txt8, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2017-11-07 11:49:31.029-06'}),
    Entry.create({content: txt9, mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2017-11-09 11:49:31.029-06'}),
    Entry.create({content: txt10, mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2017-11-10 11:49:31.029-06'}),
    Entry.create({content: txt11, mode: 'mindfulJournal', notebookId: 6, userId: 2, savedAt: '2017-12-21 11:49:31.029-06'}),
    Entry.create({content: txt12, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2017-12-22 11:49:31.029-06'}),
    Entry.create({content: txt13, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2018-01-01 11:49:31.029-06'}),
    Entry.create({content: txt14, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2018-01-02 11:49:31.029-06'}),
    Entry.create({content: txt15, mode: 'mindfulJournal', notebookId: 5, userId: 2, savedAt: '2018-01-03 11:49:31.029-06'}),
  ])

  console.log(`seeded ${entries.length} entries`)

  const dataAnalysisObj1 = await analyzeData('sampleEntry1.txt', 1)
  const dataAnalysisObj2 = await analyzeData('sampleEntry2.txt', 1)
  const dataAnalysisObj3 = await analyzeData('sampleEntry3.txt', 2)
  const dataAnalysisObj4 = await analyzeData('sampleEntry4.txt', 2)
  const dataAnalysisObj5 = await analyzeData('sampleEntry5.txt', 2)
  const dataAnalysisObj6 = await analyzeData('sampleEntry6.txt', 2)
  const dataAnalysisObj7 = await analyzeData('sampleEntry7.txt', 2)
  const dataAnalysisObj8 = await analyzeData('sampleEntry8.txt', 2)
  const dataAnalysisObj9 = await analyzeData('sampleEntry9.txt', 2)
  const dataAnalysisObj10 = await analyzeData('sampleEntry10.txt', 2)
  const dataAnalysisObj11 = await analyzeData('sampleEntry11.txt', 2)
  const dataAnalysisObj12 = await analyzeData('sampleEntry12.txt', 2)
  const dataAnalysisObj13 = await analyzeData('sampleEntry13.txt', 2)
  const dataAnalysisObj14 = await analyzeData('sampleEntry14.txt', 2)
  const dataAnalysisObj15 = await analyzeData('sampleEntry15.txt', 2)

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

// ******************* DATA ANALYSIS API CALLS START *********************

async function analyzeData(filename, userId) {

  var fs = require('fs');
  var compromise = require('compromise')

  var buffer = fs.readFileSync(__dirname + `/${filename}`);
  var txt = buffer.toString();
  var contentString = txt;
  var createdObj = {}

  // PERSONALITY INSIGHTS ----------

  var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
  var personality_insights = new PersonalityInsightsV3(
    {
      username: process.env.PERSONALITY_INSIGHTS_CREDENTIALS_UN,
      password: process.env.PERSONALITY_INSIGHTS_CREDENTIALS_PW,
      version_date: process.env.PERSONALITY_INSIGHTS_CREDENTIALS_VERSION
    }
  );

  var personalityParams = {
      // Get the content from the JSON file.
      content: contentString,
      content_type: 'text/plain',
      consumption_preferences: false,
      raw_scores: true
    };

  let perInsightsResponse = await new Promise((resolve, reject) => {
    personality_insights.profile(personalityParams, (error, response) => {
      if (error)
        console.log('Error:', error);
      else
        resolve(response)
    })
  })

  createdObj['personality'] = perInsightsResponse.personality
  createdObj['needs'] = perInsightsResponse.needs
  createdObj['values'] = perInsightsResponse.values

  // TONE ANALYZER ----------

  var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
  var tone_analyzer = new ToneAnalyzerV3(
    {
      username: process.env.TONE_ANALYZER_CREDENTIALS_UN,
      password: process.env.TONE_ANALYZER_CREDENTIALS_PW,
      version_date: process.env.TONE_ANALYZER_CREDENTIALS_VERSION
    }
  );

  var toneParams = {
      // Get the content from the JSON file.
      tone_input: contentString,
      content_type: 'text/plain',
    };

  let toneResponse = await new Promise((resolve, reject) => {
    tone_analyzer.tone(toneParams, function(error, response) {
      if (error)
          console.log('Error:', error);
      else
          resolve(response)
      })
  })

  createdObj['tones'] = toneResponse.document_tone

  // NATURAL LANGUAGE UNDERSTANDING ----------

  var naturalLanguageParams = {
    // Get the content from the JSON file.
    text: contentString,
    'features': {
        'entities': {
          'emotion': true,
          'sentiment': true
        },
        keywords: {
            sentiment: true,
            emotion: true,
            limit: 10
        },
      concepts: {

      }}
  };

  var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
  var natural_language_understanding = new NaturalLanguageUnderstandingV1(
    {
      username: process.env.NLU_CREDENTIALS_UN,
      password: process.env.NLU_CREDENTIALS_PW,
      version_date: process.env.NLU_CREDENTIALS_VERSION
    }
  );

  let natLangUndResponse = await new Promise((resolve, reject) => {
    natural_language_understanding.analyze(naturalLanguageParams, function(err, response) {
      if (err)
        console.log('error:', err);
      else
        resolve(response)
    })
  })

  createdObj['keywords'] = natLangUndResponse.keywords
  createdObj['entities'] = natLangUndResponse.entities
  createdObj['concepts'] = natLangUndResponse.concepts

  // COMPROMISE.COOL ----------

  var doc = compromise(contentString);
  createdObj['wcPeople'] = doc.people().out('frequency')
  createdObj['wcVerbs'] = doc.verbs().out('frequency')
  createdObj['wcTopics'] = doc.topics().out('frequency')
  createdObj['wcNouns'] = doc.nouns().out('frequency')

  createdObj['userId'] = userId

  return createdObj
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
