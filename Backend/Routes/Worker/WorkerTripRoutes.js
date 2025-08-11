const express = require('express');
const router = express.Router();
const Trip = require('../../Models/TripSchema');

router.get('/pending', async (req, res) => {
  try {
    const pendingTrips = await Trip.find({ status: 'Pending', worker: { $exists: false } });
    res.status(200).json({ success: true, trips: pendingTrips });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching pending trips', error });
  }
});

// POST /api/worker/trips/accept - Worker accepts a trip
router.post('/accept', async (req, res) => {
  try {
    const { tripId, workerId } = req.body;
    if (!tripId || !workerId) {
      return res.status(400).json({ success: false, message: 'tripId and workerId are required' });
    }
    // Find the trip and ensure it's still pending and unassigned
    const trip = await Trip.findOne({ _id: tripId, status: 'Pending', worker: { $exists: false } });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not available or already assigned' });
    }
    trip.worker = workerId;
    trip.acceptedAt = new Date();
    trip.status = 'Assigned';
    await trip.save();
    res.status(200).json({ success: true, message: 'Trip accepted', trip });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error accepting trip', error });
  }
});

// POST /api/worker/trips/complete - Worker marks trip as completed
router.post('/complete', async (req, res) => {
  try {
    const { tripId, workerId } = req.body;
    if (!tripId || !workerId) {
      return res.status(400).json({ success: false, message: 'tripId and workerId are required' });
    }
    // Find the trip and ensure the worker is assigned and status is correct
    const trip = await Trip.findOne({ _id: tripId, worker: workerId, status: { $in: ['Assigned', 'InProgress'] } });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found or not eligible for completion' });
    }
    trip.status = 'Completed';
    await trip.save();
    res.status(200).json({ success: true, message: 'Trip marked as completed', trip });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error marking trip as completed', error });
  }
});

module.exports = router;