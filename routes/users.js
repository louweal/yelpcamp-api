const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const User = require("../models/user");
const passport = require("passport");

router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const user = new User({ email, username });
      await User.register(user, password);
      res.json({ success: true });
    } catch (e) {
      res.json({ success: false, message: e.message });
    }
  })
);

router.post("/login", passport.authenticate("local", { failureMessage: true }), (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Login failed" });
  }
});

module.exports = router;
