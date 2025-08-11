const Vehicle = require("../../../Models/VechialSchema");

module.exports = async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
      .populate("ownerId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: vehicles
    });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching vehicles"
    });
  }
};
