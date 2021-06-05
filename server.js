const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-Handlebars");
const routes = require("./controllers");

const sequelize = require("./config/connection");
//Converting our in memory sessions to be database sessions using sequelize
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

//Creating our session requirements
// store: stores our sessions within the db using sequelize store

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

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
