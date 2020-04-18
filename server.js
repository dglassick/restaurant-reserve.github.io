var express = require("express");
var path = require("path");
var app = express();
var PORT = 3500;
const Guest = require('./index')

app.use(express.urlencoded( { extended: true}));
app.use(express.json());
//Reservation Data
var reservations = [];
// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });
  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });
  // Displays all reservations
  app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
  });
  // Create New reservations - takes in JSON input
  app.post("/api/reservations", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation.routeName = newReservation.name.toLowerCase();
    console.log(newReservation);
    reservations.push(newReservation);
    res.json(newReservation);
  });
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });