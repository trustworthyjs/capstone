const User = require('./user')
const DataAnalysis = require('./dataAnalysis')
const Notebook = require('./notebook')
const Entry = require('./entry')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.hasOne(DataAnalysis)
DataAnalysis.belongsTo(User)

Notebook.hasMany(Entry)
Entry.belongsTo(Notebook)

User.hasMany(Notebook)
Notebook.belongsTo(User)

module.exports = {
  User,
  DataAnalysis,
  Notebook,
  Entry
}
