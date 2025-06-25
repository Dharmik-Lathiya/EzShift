const ClientSchema = require("../../../Models/ClientSchema")
const clientSignup = (req, res) => {

  const { fullname, mobileno, email, password } = req.body;
  ClientSchema.insertOne({fullName:fullname,mobileNo:mobileno,emailId:email,password:password})
  .then(()=>console.log("Data Stored!!"))
  .catch((e)=>console.log(e))
  res.redirect("/Client/Dashboard")
};

module.exports = clientSignup;
