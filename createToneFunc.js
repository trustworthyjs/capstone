require('./secrets')

const toneData = async function(entryId, text) {

  var contentString = text

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

  return toneResponse.document_tone

}

module.exports = toneData
