const Client = require("../../../Models/ClientSchema");
const bcrypt = require("bcrypt");


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
      data: existingUser._id
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error during login",
    });
  }
};

module.exports = clientLogin;


// const Worker = require("../../../Models/WorkerSchema");
// const bcrypt = require("bcrypt");

// const workerLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const existingUser = await Worker.findOne({ emailId: email });

//     if (!existingUser) {
//       return res.status(400).json({
//         status: false,
//         message: "Email not found",
//       });
//     }

//     const passwordMatch = await bcrypt.compare(password, existingUser.password);
//     if (!passwordMatch) {
//       return res.status(400).json({
//         status: false,
//         message: "Incorrect password",
//       });
//     }
    
//     return res.status(200).json({
//       status: true,
//       message: "Successfully logged in",
//       data: existingUser._id
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     return res.status(500).json({
//       status: false,
//       message: "Server error during login",
//     });
//   }
// };

// module.exports = workerLogin;
