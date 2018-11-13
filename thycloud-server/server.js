const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const pe = require("parse-error");
const cors = require("cors");
const compression = require("compression");
const logger = require("./services/winston.service");
const { to, ReE, ReS } = require("./services/util.service");

const app = express();

const CONFIG = require("./config/config");
const v1 = require("./routes/v1");

// initialize BodyParser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// initialize passport
app.use(passport.initialize());

// use response compression
app.use(compression());

// Connect database and load models
const models = require("./models");

// CORS
app.use(cors());

// Routes for API v1
app.use("/v1", v1);

app.use("/", function(req, res) {
  res.statusCode = 200; // send the appropriate status code
  res.json({ status: "success", message: "Parcel Pending API", data: {} });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

// Promise Handler
process.on("unhandledRejection", error => {
  console.error("Uncaught Error", pe(error));
});

// test logger

// logger.info('Testing info channel');
// logger.warn('Testing warn channel');
// logger.error('Testing error channel');

app.listen(CONFIG.port, () =>
  console.log("Server listening on port " + CONFIG.port)
);
