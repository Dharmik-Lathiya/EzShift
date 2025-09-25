const cloudinary = require("cloudinary").v2;
const fs = require("fs");

exports.uploadDocument = async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const folder = req.query.folder || "documents";

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder,
    });

    fs.unlinkSync(filePath);

    return res.json({ success: true, url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};


