const Trip = require("../../../Models/TripSchema");

const getAllTrips = async (req, res) => {
    try {
        console.log("Fetching all trips");

        const trips = await Trip.find({}).sort({ date: -1 });

        res.json({
            success: true,
            message: "Trips fetched successfully",
            count: trips.length,
            data: trips
        });
    } catch (error) {
        console.error("Error fetching trips:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch trips",
            error: error.message
        });
    }
};

module.exports = getAllTrips; 