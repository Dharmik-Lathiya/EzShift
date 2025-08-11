const Trip = require("../../../Models/TripSchema");
const Vehicle = require("../../../Models/VechialSchema");

module.exports = async (req, res) => {
  const { tripId } = req.params;

  try {
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }

    // ✅ Find an available vehicle of the requested type
    const availableVehicle = await Vehicle.findOne({
      vehicleType: trip.vehicleType, // Make sure this exists in your TripSchema
      status: "Available"
    });

    if (!availableVehicle) {
      return res.status(200).json({
        success: false,
        message: "No available vehicle found for the selected type."
      });
    }

    trip.vehicle = availableVehicle._id;
    trip.status = "Ongoing";
    trip.isAccept = true;
    await trip.save();

    // ✅ Mark vehicle as busy
    availableVehicle.status = "Busy";
    await availableVehicle.save();

    // ✅ Return updated trip
    const populatedTrip = await Trip.findById(trip._id).populate("vehicle");

    return res.status(200).json({
      success: true,
      message: "Trip accepted and vehicle assigned",
      data: populatedTrip
    });
  } catch (error) {
    console.error("Error accepting trip:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
