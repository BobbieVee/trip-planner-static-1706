const Sequelize =  require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL);



const sync = db.sync();