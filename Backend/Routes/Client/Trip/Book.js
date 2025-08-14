const Trip = require("../../../Models/TripSchema");
const Vehicle = require("../../../Models/VechialSchema");
const Worker = require("../../../Models/WorkerSchema");

const tripBook = async (req, res) => {
  try {
    console.log("📦 Booking trip with data:", req.body);
    const { clientId, pickupAddress, dropAddress, date, vehicleType, vehicleId, numWorkers, note, timeSlot } = req.body;

    const trip = new Trip({
      clientId,
      pickupAddress,
      dropAddress,
      date,
      vehicleType,
      vehicleId,
      numWorkers,
      note,
      timeSlot
    });

    await trip.save();

    // Find all vehicles with the booked vehicleType
    const vehicles = await Vehicle.find({ vehicleType });

    // Extract owners from those vehicles
    // Assuming vehicle.ownerId or vehicle.owner (adjust field accordingly)
    const owners = vehicles.map(v => v.ownerId || v.owner).filter(Boolean);

    console.log("🚗 Vehicles found for vehicleType:", vehicleType, "=>", vehicles.length, "vehicles");

    const workers = await Worker.find({ status: "Active" }).limit(numWorkers);

    for (let worker of workers) {
      await Worker.findByIdAndUpdate(
        worker._id,
        { $addToSet: { trips: trip._id } },
        { new: true }
      );
    }
    console.log("👷 Workers assigned to trip:", workers.length);

    // Optional: Remove duplicates (owners can have multiple vehicles)
    const uniqueOwners = [...new Set(owners)];

    uniqueOwners.forEach(ownerId => {
      console.log("Owner ID:", ownerId);

    });

    console.log("Owners to notify for vehicleType", vehicleType, ":", uniqueOwners);

    // Respond with trip data + owners list (optional)
    return res.status(201).json({
      status: true,
      message: "Trip booked successfully",
      data: trip,
      notifiedOwners: uniqueOwners,
    });
  } catch (error) {
    console.error("Error booking trip:", error);
    return res.status(500).json({
      status: false,
      message: "Server error while booking trip",
    });
  }
};

module.exports = tripBook;
