const Client = require("../../../Models/ClientSchema");

module.exports = async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Client.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to delete user", error: err.message });
  }
};


