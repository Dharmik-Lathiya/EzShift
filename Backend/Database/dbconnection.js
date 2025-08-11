const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://dharmiklathiya:dharmik@ezshift.jjevlzt.mongodb.net/?retryWrites=true&w=majority&appName=EzShift")
.then(()=>console.log("Database Connected!!"))
.catch((err)=>console.log(err))