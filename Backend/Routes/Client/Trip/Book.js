const Trip = require("../../../Models/TripSchema");

const tripBook = async (req, res) => {
    try {
        console.log("Booking trip with data:", req.body);

        const {
            clientId,
            fullName,
            mobileNo,
            pickupAddress,
            dropAddress,
            date,
            timeSlot,
            vehicleType,
            needWorkers,
            numWorkers,
            note,
            distance,
            pricing
        } = req.body;
        
        const trip = new Trip({
            clientId,
            fullName,
            mobileNo: Number(mobileNo),
            pickupAddress,
            dropAddress,
            date: new Date(date),
            timeSlot,
            vehicleType,
            needWorkers,
            numWorkers: Number(numWorkers),
            note,
            distance: Number(distance),
            pricing: Number(pricing)
        });

        await trip.save();

        res.json({
            success: true,
            message: "Trip booked successfully",
            data: trip
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to book trip",
            error: error.message
        });
    }
};

module.exports = tripBook;