//require sequelize and dotenv
const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

// when on heroku use the jawsdb otherwise use local host with the .env variables
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

//export sequelize
module.exports = sequelize;
