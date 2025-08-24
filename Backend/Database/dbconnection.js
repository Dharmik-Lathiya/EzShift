const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://dharmik:VgcyttXGN5CfeNri@ezshift.jjevlzt.mongodb.net/?retryWrites=true&w=majority&appName=EzShift")
.then(()=>console.log("Database Connected!!"))
.catch((err)=>console.log(err))