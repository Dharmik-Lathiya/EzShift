const express = require('express');
const router = express.Router();
const Trip = require('../../Models/TripSchema');
const Vehicle = require('../../Models/VechialSchema');
const Worker = require('../../Models/WorkerSchema');

router.get('/Pending/:id', async (req, res) => {
  try {
    const workerId = req.params.id;

    const trips = await Trip.find({
      status: 'Pending',
      workers: workerId
    })
      .populate("clientId", "name email")   
      .populate("vehicleId", "type number");

    res.status(200).json({ success: true, trips });
  } catch (error) {
    console.error("Error fetching pending trips:", error);
    res.status(500).json({ success: false, message: 'Error fetching pending trips', error });
  }
});

router.post('/Complete/:id', async (req, res) => {
  try {
    const tripId = req.params.id;

    const trip = await Trip.findByIdAndUpdate(
      tripId,
      { status: 'Completed' },
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    res.status(200).json({ success: true, trip });
  } catch (error) {
    console.error("Error completing trip:", error);
    res.status(500).json({ success: false, message: 'Error completing trip', error });
  }
});

router.post('/Accept', async (req, res) => {
  try {
    const { tripId, workerId, vehicleId } = req.body;

    const trip = await Trip.findByIdAndUpdate(
      tripId,
      {
        workers: [workerId],
        vehicleId,
        status: 'Assigned',
        acceptedAt: new Date()
      },
      { new: true }
    );

    const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, { status: 'In Use' }, { new: true });

    res.status(200).json({ success: true, trip });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error accepting trip', error });
  }
});

router.get("/Vehicle/Active/:id", async (req, res) => {
  try {
    const { vehicleType } = req.query;
    const ownerId = req.params.id;

    const vehicles = await Vehicle.find({
      ownerId,
      vehicleType,
      status: "Active",
    });

    if (!vehicles || vehicles.length === 0) {
      return res.status(404).json({ success: false, message: "No active vehicles found" });
    }

    res.json({ success: true, vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching active vehicles", error });
  }
});

router.get('/GetAll/:id', async (req, res) => {
  try {
    const workerId = req.params.id;

    const trips = await Trip.find({ workers: workerId })
      .populate("clientId")
      .populate("workers")
      .populate("vehicleId");

    res.status(200).json({ success: true, trips });
  } catch (error) {
    console.error("Error fetching all trips:", error);
    res.status(500).json({ success: false, message: 'Error fetching all trips', error });
  }
});

router.post('/Decline', async (req, res) => {
  try {
    const { tripId, workerId } = req.body;
    const trip = await Trip.findById(tripId);

    // Remove worker from trip
    trip.workers = trip.workers.filter(worker => worker.toString() !== workerId);
    await trip.save();

    res.status(200).json({ success: true, message: 'Trip declined' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error declining trip', error });
  }
});

router.post('/Start/:id', async (req, res) => {
  try {
    const tripId = req.params.id;
    const { workerId, vehicleId } = req.body;

    const trip = await Trip.findByIdAndUpdate(
      tripId,
      {
        status: 'InProgress',
        acceptedAt: new Date()
      },
      { new: true }
    );

    const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, { status: 'In Use' }, { new: true });

    const worker = await Worker.findByIdAndUpdate(
      workerId,
      { $addToSet: { trips: tripId } },
      { new: true }
    );


    res.status(200).json({ success: true, trip });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }


});

module.exports = router;