const Worker = require("../../../Models/WorkerSchema");
const bcrypt = require("bcrypt");

const workerSignup = async (req, res) => {
  const { fullname, mobileno, email, password, address } = req.body;

  try {
    const existingUser = await Worker.findOne({ emailId: email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newWorker = new Worker({
      fullname,
      mobileNo: mobileno,
      emailId: email,
      address,
      password: hashedPassword
    });

    let newWorkerData = await newWorker.save();

    return res.status(200).json({
      status: true,
      message: "Worker registered successfully",
      data: newWorkerData._id
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error during signup",
    });
  }
};

module.exports = workerSignup;
