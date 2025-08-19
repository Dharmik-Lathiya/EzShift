const Worker = require("../../../Models/WorkerSchema");
const bcrypt = require("bcrypt");

const workerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Worker.findOne({ emailId: email });

    if (!existingUser) {
      return res.status(400).json({
        status: false,
        message: "Email not found",
      });
    }

    const isAdmin = email === "dharmik.lathiya@qrolic.com";
    if (isAdmin) {
      const isAdminPassword = await bcrypt.compare(password, existingUser.password);
      if (!isAdminPassword) {
        return res.status(400).json({
          status: false,
          message: "Incorrect password for admin",
        });
      }
      return res.status(200).json({
        status: true,
        message: "Successfully logged in as admin",
        data: {
          userId: existingUser._id,
          role: "admin",
        },
      });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
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
        role: "worker",
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error during login",
    });
  }
};

module.exports = workerLogin;
