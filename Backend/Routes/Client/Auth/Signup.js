
const clientSignup = (req,res)=>{
    // let {email,fullname,password,mobileno}=req.body;
    // console.log(email,fullname,password,mobileno);
    const { fullname, mobileno, email, password } = req.body;

  if (!fullname || !mobileno || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Save user to DB
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports=clientSignup;