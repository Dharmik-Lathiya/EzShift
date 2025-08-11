const express = require('express');
const routes = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const {
  createVehicle,
  getVehicles,
  getVehicle,
  updateVehicle,
  updateVehicleStatus,
  deleteVehicle
} = require('./Worker/Vehicle/vehicleRoutes');

const {
  getWorkerProfile
} = require('./Worker/profileRoutes');

// Client Routes
const clientSignup = require("./Client/Auth/Signup");
const clientLogin = require("./Client/Auth/Login");
const tripBook = require("./Client/Trip/Book");

// Admin Routes
const getAllTrips = require("./Admin/Trips/GetAll");
const acceptTrip = require("./Admin/Trips/AcceptTrip");
const getAllUsers = require("./Admin/User/GetAll");
const getAllVehicles = require("./Admin/Vehicle/GetAll");

// Worker Trip APIs
const workerTripRoutes = require('./Worker/WorkerTripRoutes');
const workerLogin = require('./Worker/Auth/Login');
const workerSignup = require('./Worker/Auth/Signup');

// Client APIs
routes.post("/Client/Login", clientLogin);
routes.post("/Client/SignUp", clientSignup);
routes.post("/Client/Trip/Book", tripBook);

// Admin APIs
routes.get("/Admin/User/GetAll", getAllUsers);
routes.get("/Admin/Trip/GetAll", getAllTrips);
routes.get("/Admin/Vehicle/GetAll", getAllVehicles);
routes.put("/Admin/Trip/Accept/:tripId", acceptTrip);

// Vehicle APIs
routes.post('/Vehicle/Add', createVehicle);
routes.get('/Vehicle/Fetch/:id', getVehicles);
routes.post('/Vehicle/Delete/:id', deleteVehicle);
routes.patch('/Vehicle/Status/:id', updateVehicleStatus);
routes.get('/Vehicle/Get/:id', getVehicle);
routes.put('/Vehicle/Edit/:id', updateVehicle);


// Worker APIs
routes.use('/Worker/Trip', workerTripRoutes);
routes.post("/Worker/Login", workerLogin);
routes.post("/Worker/SignUp", workerSignup);
routes.post("/Worker/Vehicle/Add", upload.fields([
  { name: 'drivingLicense', maxCount: 1 },
  { name: 'vehicleDocument', maxCount: 1 }
]), createVehicle);
routes.get("/Worker/Profile/:id",getWorkerProfile);


module.exports = routes;