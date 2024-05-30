const { Router } = require("express");
const [login, signup] = require("../Controllers/auth")
const authRoutes = Router()

authRoutes.post("/signup", login)
authRoutes.post("/signin", signup)

module.exports = authRoutes