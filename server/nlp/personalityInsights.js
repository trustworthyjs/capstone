var fs = require('fs');
var buffer = fs.readFileSync(__dirname + '/text.txt');
var txt = buffer.toString();

var compromise = require('compromise')

var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var personality_insights = new PersonalityInsightsV3(
  process.env.PERSONALITY_INSIGHTS_CREDENTIALS
);

// var contentString = '…That night at home I told my wife about what I had seen and she and I agreed we had to do more than just a tree with no lights…After a couple days I made another appointment to visit with Dohn at his home again. This time I was not alone. We had three cars and two trucks behind us. I knocked at the door and when it opened a precession of strangers began to enter with armfuls of items he and his family desperately needed. …Few words were spoken while hands were grasped and arms draped around one another. Many years have passed since the night we shared in that wonderful Christmas. I often wonder about Dohn and his family. I am sure he has been in a position to reach out and help someone in kind. I do know this for sure. Anytime we reach out to help, and by so doing, lift a fellow human being, we ourselves are elevated.';
var contentString = txt;

var personalityParams = {
    // Get the content from the JSON file.
    content: contentString,
    content_type: 'text/plain',
    consumption_preferences: true,
    raw_scores: true
  };

// personality_insights.profile(personalityParams, function(error, response) {
//     if (error)
//         console.log('Error:', error);
//     else
//         console.log(JSON.stringify(response, null, 2));
//     }
// );


var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var tone_analyzer = new ToneAnalyzerV3(
  process.env.TONE_ANALYZER_CREDENTIALS
);

var toneParams = {
    // Get the content from the JSON file.
    tone_input: contentString,
    content_type: 'text/plain',
  };

// tone_analyzer.tone(toneParams, function(error, response) {
//     if (error)
//         console.log('Error:', error);
//     else
//         console.log(JSON.stringify(response, null, 2));
//     }
// )

var naturalLanguageParams = {
    // Get the content from the JSON file.
    text: contentString,
    'features': {
        'entities': {
          'emotion': true,
          'sentiment': true
        },
        concepts: {
            limit: 5
        },
        relations: {}
      }
  };

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1(
    process.env.NLU_CREDENTIALS
);

// natural_language_understanding.analyze(naturalLanguageParams, function(err, response) {
//     if (err)
//       console.log('error:', err);
//     else
//       console.log(JSON.stringify(response, null, 2));
//   });

var doc = compromise(contentString);
console.log(doc.people().out('frequency'));