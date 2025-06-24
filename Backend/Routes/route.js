const routes = require('express').Router();

const clientSignup = require("./Client/Auth/Signup")

routes.post("/Client/Login",clientSignup)

module.exports = routes