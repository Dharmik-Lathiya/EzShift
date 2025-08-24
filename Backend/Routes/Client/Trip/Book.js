const Trip = require("../../../Models/TripSchema");
const Vehicle = require("../../../Models/VechialSchema");
const Worker = require("../../../Models/WorkerSchema");
const { sendFCMNotification } = require("../../../sendNoti"); 

exports.tripBook = async (req, res) => {
  try {
    console.log("📦 Booking trip with data:", req.body);

    const { 
      clientId, 
      pickupAddress, 
      dropAddress, 
      date, 
      vehicleType, 
      vehicleId, 
      numWorkers, 
      note, 
      timeSlot,
      pricing
    } = req.body;

    // 1️⃣ Create a new trip
    let trip = new Trip({
      clientId,
      pickupAddress,
      dropAddress,
      date,
      vehicleType,
      vehicleId: vehicleId || null,
      numWorkers,
      note,
      timeSlot,
      pricing,
      vehicleAssigned: !!vehicleId
    });

    await trip.save();

    // 2️⃣ Find vehicles
    let vehicles = [];
    if (vehicleId) {
      const vehicle = await Vehicle.findOne({ _id: vehicleId, status: "Active" });
      if (vehicle) vehicles = [vehicle];
    } else {
      vehicles = await Vehicle.find({ vehicleType, status: "Active" });
    }

    console.log("🚗 Vehicles found for type:", vehicleType, "=>", vehicles.length);

    // 3️⃣ Collect unique owner IDs
    const ownerIdsWithDuplicates = vehicles.map(v => v.ownerId);
    const ownerIds = [...new Set(ownerIdsWithDuplicates.map(id => id.toString()))];
    console.log("👷 Unique workers (vehicle owners) to notify:", ownerIds);

    // 4️⃣ Assign workers to this trip
    if (ownerIds.length > 0) {
      const assignedWorkerIds = ownerIds.slice(0, numWorkers || ownerIds.length);

      trip.workers = assignedWorkerIds;
      await trip.save();

      await Worker.updateMany(
        { _id: { $in: assignedWorkerIds } },
        { $addToSet: { trips: trip._id } }
      );

      console.log("👷 Workers assigned to trip:", assignedWorkerIds.length);
      console.log();
      

      // 5️⃣ Send FCM notifications
      const workers = await Worker.find({ _id: { $in: assignedWorkerIds } });
      for (let worker of workers) {
        if (worker.fcmToken) { 
          console.log(`📬 Sending notification to worker ${worker._id} (${worker.fcmToken})`);
          await sendFCMNotification(
            worker.fcmToken,
            "🚚 New Trip Assigned",
            `Pickup: ${pickupAddress} → Drop: ${dropAddress}`,
            { tripId: trip._id.toString() }
          );
        }
      }
    }

    // 6️⃣ Respond back
    return res.status(201).json({
      status: true,
      message: "Trip booked successfully",
      data: trip,
      notifiedOwners: ownerIds,
    });

  } catch (error) {
    console.error("❌ Error booking trip:", error);
    return res.status(500).json({
      status: false,
      message: "Server error while booking trip",
    });
  }
};

exports.getClientAllTrips = async (req, res) => {
  try {
    const clientId = req.params.id;

    console.log("Fetching all trips for client:", clientId);

    const trips = await Trip.find({ clientId: clientId })
      .populate("vehicleId");

    res.status(200).json({ success: true, trips });
  } catch (error) {
    console.error("Error fetching all trips:", error);
    res.status(500).json({ success: false, message: 'Error fetching all trips', error });
  }
};
