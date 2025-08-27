const express = require('express');
const routes = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const {
  createVehicle,
  getVehicles,
  getVehicle,
  getActiveVehicles,
  updateVehicle,
  updateVehicleStatus,
  deleteVehicle
} = require('./Worker/Vehicle/vehicleRoutes');

const {

  getWorkerProfile,
  updateWorkerProfile,
  updateWorkerToken
} = require('./Worker/profileRoutes');

// Client Routes
const clientSignup = require("./Client/Auth/Signup");
const clientLogin = require("./Client/Auth/Login");
const {getClientProfile,updatedClientProfile} = require("./Client/Profile");
const {
  tripBook,
  getClientAllTrips
} = require("./Client/Trip/Book");


// Admin Routes
const getAllTrips = require("./Admin/Trips/GetAll");
const acceptTrip = require("./Admin/Trips/AcceptTrip");
const getAllUsers = require("./Admin/User/GetAll");
const getAllVehicles = require("./Admin/Vehicle/GetAll");
const { getAdminProfile, updateAdminProfile } = require("./Admin/adminProfile");

// Worker Trip APIs
const workerTripRoutes = require('./Worker/WorkerTripRoutes');
const workerLogin = require('./Worker/Auth/Login');
const workerSignup = require('./Worker/Auth/Signup');

// Client APIs
routes.post("/Client/Login", clientLogin);
routes.post("/Client/SignUp", clientSignup);
routes.post("/Client/BookTrip", tripBook);
routes.get("/Client/Trip/GetAll/:id", getClientAllTrips);
routes.get("/Client/Profile/:id", getClientProfile);
routes.put("/Client/Profile/Update/:id",updatedClientProfile);


// Admin APIs
routes.get("/Admin/User/GetAll", getAllUsers);
routes.get("/Admin/Trip/GetAll", getAllTrips);
routes.get("/Admin/Vehicle/GetAll", getAllVehicles);
routes.put("/Admin/Trip/Accept/:tripId", acceptTrip);
routes.get("/Admin/Get/Profile", getAdminProfile);
routes.put("/Admin/Edit/Profile", updateAdminProfile);


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
routes.get("/Worker/Vehicle/Active/:id", getActiveVehicles);
routes.get("/Worker/Profile/:id", getWorkerProfile);
routes.patch("/Worker/FCMToken/:id", updateWorkerToken);
routes.put("/Worker/Profile/Edit/:id", updateWorkerProfile);



module.exports = routes;
