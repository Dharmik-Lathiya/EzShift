const Client = require("../../Models/ClientSchema");

exports.getClientProfile = async (req,res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const client = await Client.findById(id);
        console.log(client);
        
        res.status(200).json(client);
        } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updatedClientProfile = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedClient);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};