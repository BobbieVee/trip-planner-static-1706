const Sequelize = require('sequelize');
const Activity = require('./Activities');
const Place = require('./Places');
const Hotel = require('./Hotels');
const Restaurant = require('./Restaurants');


const db = new Sequelize(process.env.DATABASE_URL);

// Associations

// Hotels, activities, and restaurants should 
// furthermore be associated with a particular place.




// const Place = db.define('place', {
//   address: Sequelize.STRING,
//   city: Sequelize.STRING,
//   state: Sequelize.STRING,
//   phone: Sequelize.STRING,
//   location: Sequelize.STRING  // ARRAY
// });

// const Hotel = db.define('hotel', {
//   name: Sequelize.STRING,
//   num_stars: Sequelize.INTEGER,
//   amenities: Sequelize.STRING
// });

// const Activity = db.define('activity', {
//   name: Sequelize.STRING,
//   age_range: Sequelize.STRING,
// });

// const Restaurant = db.define('restaurant', {
//   name: Sequelize.STRING,
//   cuisine: Sequelize.STRING,
//   price: Sequelize.INTEGER
// });



// Place.hasMany(Hotel);
// Hotel.hasOne(Place);

// Place.hasMany(Activity);
// Activity.hasOne(Place);

// Place.hasMany(Restaurant);
// Restaurant.hasOne(Place);

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

const sync = () => db.sync({ force: true });

// const seed = () => {
//   Place.create({
//     address: "5 Hanover Square",
//     city: "New York",
//     state: "NY",
//     phone: "555-555-5555",
//     location: "49,45"
//   });
// }; 

// address: Sequelize.STRING,
// city: Sequelize.STRING,
// state: Sequelize.STRING,
// phone: Sequelize.STRING,
// location: Sequelize.STRING  // ARRAY

module.exports = {
  db,
  sync,
  test: 'test string'
  // Place,
  // Hotel,
  // Activity,
  // Restaurant
};