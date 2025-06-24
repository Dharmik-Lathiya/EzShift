const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./Routes/route")

const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

require("./Database/dbconnection")

app.use("/",routes);

app.listen(port,()=>{
    console.log("Server Started!!");
})

