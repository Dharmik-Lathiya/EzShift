const Worker = require('../../Models/WorkerSchema');

exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Worker.findById("68a321456a9e1d3bf6346bcd");
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.updateAdminProfile = async (req, res) => {
  try {
    const { firstName, email, mobileNo } = req.body;
    const admin = await Worker.findByIdAndUpdate("68a321456a9e1d3bf6346bcd", { firstName, email, mobileNo }, { new: true });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    console.error('Error updating admin profile:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

