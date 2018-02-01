const Sequelize = require('sequelize')
const db = require('../db')

const Entry = db.define('entry', {
  title: {
    type: Sequelize.STRING,
    defaultValue: Date()
  },
  content: {
    type: Sequelize.TEXT,
  },
  formattedContent: {
    type: Sequelize.TEXT,
  },
  mode: {
    type: Sequelize.ENUM,
    values: ['freeWrite', 'mindfulJournal', 'custom']
  },
  settings: {
    type: Sequelize.JSON
  },
  savedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  submitted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  tones: {
    type: Sequelize.JSON
  }
})

Entry.beforeValidate(entry => {
  if (entry.mode === 'freeWrite') {
    entry.settings = {
      timer: true,
      wordCount: true,
      prompts: true,
      visualCues: true,
      music: false,
      zoomIn: true
    }
  } else if (entry.mode === 'mindfulJournal') {
    entry.settings = {
      timer: false,
      wordCount: true,
      prompts: true,
      visualCues: false,
      music: true,
      zoomIn: false
    }
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
