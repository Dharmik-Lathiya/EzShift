const mongoose = require("mongoose");

const ClientSchema=mongoose.Schema({
    fullName:{type:String},
    mobileNo:{type:Number},
    emailId:{type:String},
    password:{type:String},
    dob:{type:Date},
    img:{type:String},
    tripHistory:[{
        from:{type:String},
        To:{type:String},
        date:{type:Date},
        vehicle:{type:String},
    }]

})

module.exports = mongoose.model("client",ClientSchema);
