require('./secrets')

const nounData = function(text) {
  var compromise = require('compromise')

  // COMPROMISE.COOL ----------

  var doc = compromise(text);
  return doc.nouns().out('frequency')
}

module.exports = nounData
