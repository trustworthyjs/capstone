const Sequelize = require('sequelize')
const db = require('../db')

const Entry = db.define('entry', {
  title: {
    type: Sequelize.STRING,
    defaultValue: Date()
  },
  content: {
    type: Sequelize.TEXT
  },
  mode: {
    type: Sequelize.ENUM,
    values: ['freeWrite', 'mindfulJournal', 'custom']
  }
})

Entry.prototype.getFormattedTime = function (fourDigitTime) {
  var hours24 = parseInt(fourDigitTime.substring(0, 2),10);
  var hours = ((hours24 + 11) % 12) + 1;
  var amPm = hours24 > 11 ? 'pm' : 'am';
  var minutes = fourDigitTime.substring(2);
  return hours + ':' + minutes + ' ' + amPm;
}

module.exports = Entry
