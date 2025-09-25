const Client = require("../../Models/ClientSchema");

exports.getClientProfile = async (req,res) => {
    const { id } = req.params;
    try {
        
      const client = await Client.findById(id);

        res.status(200).json(client);
        } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updatedClientProfile = async (req, res) => {
  try {
    console.log("Update request body:", req.body);
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log(updatedClient);
    
    res.json(updatedClient);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};