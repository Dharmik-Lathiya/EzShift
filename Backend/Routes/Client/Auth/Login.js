const ClientSchema = require("../../../Models/ClientSchema");
const clientLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  let exsitingUser = await ClientSchema.findOne({ emailId:email });

  if (exsitingUser) {
    let exsitingPassword = exsitingUser.password;
    
    if (password === exsitingPassword) {
      res.status(200).send({
        status: true,
        message: "Sucessfully Login!!",
        data: { email, password },
      });
    } else {
      res.status(400).send({
        status: false,
        message: "Password Not Found",
        data: exsitingUser,
      });
    }
  } else {
    res.status(400).send({
      status: false,
      message: "Email Not Found",
      data: exsitingUser,
    });
  }
};
module.exports = clientLogin;
