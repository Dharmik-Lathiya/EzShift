const Client = require("../../../Models/ClientSchema");
const bcrypt = require("bcrypt");


const clientSignup = async (req, res) => {
  const { fullName, mobileNo, email, password, address } = req.body;

  try {
    const existingUser = await Client.findOne({ emailId: email });
    if (existingUser) { 
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("New client registration:", {
      fullName,
      mobileNo,
      emailId: email,
      address,
    });

    const newClient = new Client({
      fullName,
      mobileNo,
      emailId: email,
      address,
      password: hashedPassword
    });

    let newClientData = await newClient.save();

    return res.status(200).json({
      status: true,
      message: "Client registered successfully",
      data: newClientData._id
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error during signup",
    });
  }
};

module.exports = clientSignup;