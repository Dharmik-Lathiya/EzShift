const Client = require("../../../Models/ClientSchema");

const clientLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Client.findOne({ emailId: email });

    if (!existingUser) {
      return res.status(400).json({
        status: false,
        message: "Email not found",
      });
    }

    if (existingUser.password !== password) {
      return res.status(400).json({
        status: false,
        message: "Incorrect password",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Successfully logged in",
      data: {
        userId: existingUser._id,
        email: existingUser.emailId,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      status: false,
      message: "Server error during login",
    });
  }
};

module.exports = clientLogin;
