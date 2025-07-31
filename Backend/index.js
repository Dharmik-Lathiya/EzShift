const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./Routes/route")
const clientPayRoute = require("./Routes/Client/clientPayRoute")

const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 
app.use(express.json());


require("./Database/dbconnection")

app.use("/api/payu/Client", clientPayRoute);
app.use("/",routes);

app.listen(port,()=>{
    console.log("Server Started!!");
})

