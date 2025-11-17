const Trip = require("../../../Models/TripSchema");
const Vehicle = require("../../../Models/VechialSchema");
const Worker = require("../../../Models/WorkerSchema");
const { sendFCMNotification } = require("../../../sendNoti"); 

exports.tripBook = async (req, res) => {
  try {
    console.log("Booking trip with data:", req.body);

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

    let vehicles = [];
    if (vehicleId) {
      const vehicle = await Vehicle.findOne({ _id: vehicleId, status: "Active" });
      if (vehicle) vehicles = [vehicle];
    } else {
      vehicles = await Vehicle.find({ vehicleType, status: "Active" });
    }

    console.log("Vehicles found for type:", vehicleType, "=>", vehicles.length);

    const ownerIdsWithDuplicates = vehicles.map(v => v.ownerId);
    const ownerIds = [...new Set(ownerIdsWithDuplicates.map(id => id.toString()))];
    console.log("Unique workers (vehicle owners) to notify:", ownerIds);

    if (ownerIds.length > 0) {
      const assignedWorkerIds = ownerIds.slice(0, numWorkers || ownerIds.length);

      trip.workers = assignedWorkerIds;
      await trip.save();

      // Do not increment worker trip counters here; this is handled when the trip is completed.

      console.log("Workers assigned to trip:", assignedWorkerIds.length);
      console.log();
      

      const workers = await Worker.find({ _id: { $in: assignedWorkerIds } });
      const notifyResults = { success: [], failed: [] };
      for (let worker of workers) {
        console.log(`📬 Sending notification to worker ${worker._id} (${worker.fcmToken})`);
        if (!worker.fcmToken) {
          notifyResults.failed.push({ workerId: worker._id.toString(), code: 'no-token' });
          continue;
        }

        const result = await sendFCMNotification(
          worker.fcmToken,
          "New Trip Assigned",
          `Pickup: ${pickupAddress} → Drop: ${dropAddress}`,
          { tripId: trip._id.toString() }
        );

        if (result && result.success) {
          notifyResults.success.push(worker._id.toString());
        } else {
          const code = result?.code || 'unknown';
          notifyResults.failed.push({ workerId: worker._id.toString(), code });
          if (code === 'messaging/registration-token-not-registered') {
            await Worker.findByIdAndUpdate(worker._id, { $unset: { fcmToken: "" } });
          }
        }
      }
    }
    return res.status(201).json({
      status: true,
      message: "Trip booked successfully",
      data: trip,
      notifiedOwners: ownerIds,
    });

  } catch (error) {
    console.error("Error booking trip:", error);
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
