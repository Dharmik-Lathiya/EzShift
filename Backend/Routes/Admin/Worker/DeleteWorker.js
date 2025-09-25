const Worker = require("../../../Models/WorkerSchema");

module.exports = async function deleteWorker(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Worker.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Worker not found" });
    }
    return res.json({ success: true, message: "Worker deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to delete worker", error: err.message });
  }
};


