const ClientSchema = require("../../../Models/ClientSchema")
const clientSignup = (req, res) => {

  const { fullname, mobileno, email, password } = req.body;
  
  let exsitingUser=ClientSchema.findOne({emailId:email});
  if(exsitingUser){
    return res.status(400).send({
      status:false,
      message:"User Already Exisits"
    })
  }
  else{
    ClientSchema.insertOne({fullName:fullname,mobileNo:mobileno,emailId:email,password:password})
  .then(()=>console.log("Data Stored!!"))
  .catch((e)=>console.log(e))
  }
  res.redirect("/Client/Dashboard")
};

module.exports = clientSignup;
