require('./secrets')

const analyzeData = async function(textOrFile, userId, filename, currentDir, text) {

  var compromise = require('compromise')

  if (textOrFile === 'file') {
    var fs = require('fs')
    var buffer = fs.readFileSync(__dirname + currentDir + `/${filename}`);
    var contentString = buffer.toString();
  } else {
    var contentString = text
  }

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

module.exports = analyzeData
