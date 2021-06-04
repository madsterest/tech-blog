const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

//JAWSDB refers to deployment on Heroku. Its an addon that supplies a function MySQL Database
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.UB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}
