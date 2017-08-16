const db = require('./index');

console.log('db = ', db)

const Activity = db.define('activity', {
  name: db.STRING,
  age_range: db.STRING,
});

module.exports = Activity;