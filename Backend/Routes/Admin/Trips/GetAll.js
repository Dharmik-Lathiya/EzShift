const Trip = require("../../../Models/TripSchema");

const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().populate("vehicle");
    res.status(200).json({
      success: true,
      data: trips,
    });
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trips",
      error: error.message,
    });
  }
};

module.exports = getAllTrips;
