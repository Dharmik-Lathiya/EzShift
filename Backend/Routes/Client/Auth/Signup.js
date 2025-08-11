const Client = require("../../../Models/ClientSchema");

const clientSignup = async (req, res) => {
  const { fullname, mobileno, email, password } = req.body;

  try {
    const existingUser = await Client.findOne({ emailId: email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    const newClient = new Client({
      fullName: fullname,
      mobileNo: mobileno,
      emailId: email,
      password,
    });

    await newClient.save();
    console.log("Client stored!");

    return res.status(200).json({
      status: true,
      message: "Client registered successfully",
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
