
const Worker = require("../../Models/WorkerSchema.js");
const Client = require("../../Models/ClientSchema.js");
const  cloudinary  = require("cloudinary").v2;
const fs = require("fs");

exports.uploadProfile = async (req,res) => {
try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
    const { type, id } = req.params;
    const imageUrl = req.file.path; 

    console.log("Imahe Url ",imageUrl);

    let Model;
    if (type === "worker") Model = Worker;
    else if (type === "client") Model = Client;
    else return res.status(400).json({ success: false, error: "Invalid type" });

    let responseClodinary = await cloudinary.uploader.upload(imageUrl,{
        resource_type:"auto"
    })

    let cloudinaryImg = responseClodinary.secure_url;
    console.log(cloudinaryImg);
    


    const updatedUser = await Model.findByIdAndUpdate(
      id,
      { avatar: cloudinaryImg },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    fs.unlinkSync(imageUrl);

    
    res.json({ success: true, data: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}