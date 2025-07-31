const Trip = require("../../../Models/TripSchema");

module.exports = async (req, res) => {
  const { tripId } = req.params;

  try {
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    trip.isAccept = true;
    await trip.save();

    return res.status(200).json({ success: true, message: "Trip accepted", trip });
  } catch (error) {
    console.error("Error accepting trip:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
