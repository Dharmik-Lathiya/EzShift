const express = require('express');
const router = express.Router();
const Trip = require('../../Models/TripSchema');

router.get('/Pending/:id', async (req, res) => {
  try {
    const workerId = req.params.id;

    // Find trips with status "Pending" where workers array contains this workerId
    const trips = await Trip.find({ 
      status: 'Pending', 
      workers: workerId 
    })
    .populate("clientId", "name email")   // if you want client details
    .populate("vehicleId", "type number"); // if you want vehicle details

    res.status(200).json({ success: true, trips });
  } catch (error) {
    console.error("Error fetching pending trips:", error);
    res.status(500).json({ success: false, message: 'Error fetching pending trips', error });
  } 
});
// Accept trip
router.post('/Accept', async (req, res) => {
  try {
    const { tripId, workerId } = req.body;

    const trip = await Trip.findByIdAndUpdate(
      tripId,
      { 
        $push: { workers: workerId },
        status: 'Assigned',
        acceptedAt: new Date()
      },
      { new: true }
    );

    res.status(200).json({ success: true, trip });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error accepting trip', error });
  }
});

// Decline trip
router.post('/Decline', async (req, res) => {
  try {
    const { tripId, workerId } = req.body;

    // optional: log declined workers in trip
    res.status(200).json({ success: true, message: 'Trip declined' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error declining trip', error });
  }
});


module.exports = router;