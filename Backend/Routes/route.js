const express = require('express');
const routes = express.Router();

const clientSignup = require("./Client/Auth/Signup");
const clientLogin = require("./Client/Auth/Login");
const tripBook = require("./Client/Trip/Book");
const getAllTrips = require("./Admin/Trips/GetAll");
const acceptTrip = require("./Admin/Trips/AcceptTrip");
const getAllUsers = require("./Admin/User/GetAll");

// Client Routes
routes.post("/Client/Login", clientLogin);
routes.post("/Client/SignUp", clientSignup);
routes.post("/Client/Trip/Book", tripBook);

// Admin Routes

routes.get("/Admin/User/GetAll", getAllUsers);
routes.get("/Admin/Trip/GetAll", getAllTrips);
routes.put("/Admin/Trip/Accept/:tripId", acceptTrip);

module.exports = routes;
