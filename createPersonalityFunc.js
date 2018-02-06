
const personalityData = async function(entryId, text) {
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
        content: text,
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

    return perInsightsResponse.personality
}

module.exports = personalityData
