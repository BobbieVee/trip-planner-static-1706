const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/tripplanner_db');


const Place = db.define('place', {
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  phone: Sequelize.STRING,
  location: Sequelize.ARRAY(Sequelize.FLOAT)  // ARRAY
});

const Hotel = db.define('hotel', {
  name: Sequelize.STRING,
  num_stars: Sequelize.INTEGER,
  amenities: Sequelize.STRING
});

const Activity = db.define('activity', {
  name: Sequelize.STRING,
  age_range: Sequelize.STRING,
});

const Restaurant = db.define('restaurant', {
  name: Sequelize.STRING,
  cuisine: Sequelize.STRING,
  price: Sequelize.INTEGER
});

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

const sync = () => db.sync({ force: true });

const seed = () => {
  Place.create({
    address: "5 Hanover Square",
    city: "New York",
    state: "NY",
    phone: "555-555-5555",
    location: "49,45"
  });
}; 

module.exports = {

  sync,
  seed, 
  models: {
  	Place: Place,
  	Hotel: Hotel,
  	Activity: Activity, 
  	Restaurant: Restaurant
  }
};