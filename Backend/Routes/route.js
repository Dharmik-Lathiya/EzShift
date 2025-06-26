const routes = require('express').Router();

const clientSignup = require("./Client/Auth/Signup")
const clientLogin = require("./Client/Auth/Login")

routes.post("/Client/Login",clientLogin)
routes.post("/Client/SignUp",clientSignup)

module.exports = routes