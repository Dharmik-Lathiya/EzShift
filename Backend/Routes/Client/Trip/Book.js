const Trip = require("../../../Models/TripSchema");
const Vehicle = require("../../../Models/VechialSchema");
const Worker = require("../../../Models/WorkerSchema");

const tripBook = async (req, res) => {
  try {
    console.log("📦 Booking trip with data:", req.body);

    const {
      clientId,
      fullName,
      mobileNo,
      pickupAddress,
      dropAddress,
      date,
      timeSlot,
      vehicleType,
      vehicle, // ✅ now accepted from client
      needWorkers,
      numWorkers,
      note,
      distance,
      pricing
    } = req.body;

    // ✅ Normalize vehicle type
    const typeMapping = {
      "small van": "Small Van",
      "van": "Small Van",
      "pickup": "Pickup Truck",
      "heavy": "Mini Truck"
    };

    const normalizedType = vehicleType?.toLowerCase();
    const mappedVehicleType = typeMapping[normalizedType];

    if (!mappedVehicleType) {
      return res.status(400).json({
        success: false,
        message: `Invalid vehicle type: ${vehicleType}`
      });
    }

    let vehicleId = null;
    let vehicleAssigned = false;

    if (vehicle) {
      // ✅ Use client-provided vehicle
      const existingVehicle = await Vehicle.findById(vehicle);
      if (existingVehicle) {
        vehicleId = existingVehicle._id;
        vehicleAssigned = true;
      } else {
        return res.status(404).json({
          success: false,
          message: "Provided vehicle ID not found"
        });
      }
    } else {
      // ✅ Auto-assign an available vehicle
      const availableVehicle = await Vehicle.findOne({
        vehicleType: new RegExp(`^${mappedVehicleType}$`, "i"),
        status: /^Inactive$/i
      }).populate("ownerId");

      if (availableVehicle) {
        availableVehicle.status = "Active";
        await availableVehicle.save();
        vehicleId = availableVehicle._id;
        vehicleAssigned = true;
      } else {
        console.warn("⚠️ No available vehicle found — trip will be saved without vehicle.");
      }
    }

    const trip = new Trip({
      client: clientId,
      fullName,
      mobileNo: Number(mobileNo),
      pickupAddress,
      dropAddress,
      from: pickupAddress,
      to: dropAddress,
      date: new Date(date),
      timeSlot,
      vehicleType: mappedVehicleType,
      needWorkers,
      numWorkers: Number(numWorkers),
      note,
      distance: Number(distance),
      fare: Number(pricing),
      vehicle: vehicleId,
      vehicleAssigned,
      status: 'Pending',
      worker: undefined,
      acceptedAt: undefined 
    });

    await trip.save();

    return res.status(200).json({
      success: true,
      message: vehicleAssigned
        ? "Trip booked with vehicle assigned."
        : "Trip booked without vehicle (pending assignment).",
      data: trip
    });

  } catch (error) {
    console.error("❌ Trip Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to book trip",
      error: error.message
    });
  }
};

module.exports = tripBook;
