const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./Routes/route")
const clientPayRoute = require("./Routes/Client/clientPayRoute")
const paymentRoute = require("./Routes/Client/paymentRoute")

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

// Health check — lets the frontend wake a cold-started (Render) instance
// before real API calls, without waiting for a DB handshake.
app.get("/health", (req, res) => res.status(200).json({ status: "ok" })); 

require("./Database/dbconnection")

app.use("/api/payu/Client", clientPayRoute);
app.use("/api/payu/payment", paymentRoute);
app.use("/",routes);


app.listen(port,()=>{
    console.log("Server Started!!");
})

