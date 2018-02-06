const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  theme: {
    type: Sequelize.ENUM,
    values: ['basic', 'pirate', 'beach', 'forest', 'mountains'],
    defaultValue: 'basic'
  },
  streakGoalDate: {
    type: Sequelize.DATE,
  },
  streakGoalStart: {
    type: Sequelize.DATE
  },
  currentStreak: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  maxStreak: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password
}

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
  //streak validation added in this hook
  if (user.changed('streakGoalDate')){
    user.streakGoalStart = user.updatedAt
  }
  if (user.changed('currentStreak') && user.currentStreak > user.maxStreak){
     user.maxStreak = user.currentStreak
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
