const Worker = require("../../../Models/WorkerSchema");

module.exports = async (req, res) => {
  try {
    const workers = await Worker.find().sort({ createdAt: -1 }); 
    res.status(200).json({ success: true, data: workers });
  } catch (error) {
    console.error("Error fetching Worker:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
