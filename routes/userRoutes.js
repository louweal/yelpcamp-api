const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const userController = require("../controllers/userController");

router.post("/register", catchAsync(userController.register));
router.post("/login", passport.authenticate("local", { failureMessage: true }), userController.login);
router.get("/logout", userController.logout);

module.exports = router;
