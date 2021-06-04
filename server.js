const path = require("path");
const express = require("express");
const session = require("session");

const sequelize = require("./config/connection");

//Converting our in memory sessions to be database sessions using sequelize
const SequelizeStore = require("connect-session-sequelize");

const app = express();
const PORT = process.env.PORT || 3001;

//Creating our session requirements
//store: stores our sessions within the db using sequelize store

const sess = {
  secret: "I don't like birds",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//Middleware telling our code to use the sess we just initiated
app.use(session(sess));
