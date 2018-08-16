require("dotenv").config();
const app = require('./app');
//const express = require("express");
//const path = require("path");
//const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const index = require("./Routes/index");
const PORT = process.env.PORT || 3002;
const http = require('http');
app.set('port', PORT);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(index);

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/realdoctors");

const server = http.createServer(app);
server.listen(PORT, function() {
  console.log(`🌎 ==> API Server now listening on port ${PORT}!`);
});
