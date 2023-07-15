const User = require("../models/user");

module.exports.register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const user = new User({ email, username });
    const regUser = await User.register(user, password);

    req.login(user, (err) => {
      if (err) return next(err);
      res.json({ success: true, user: regUser });
    });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
};

module.exports.login = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ success: true, user: req.user });
  } else {
    res.json({ success: false, message: "Login failed" });
  }
};

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ success: true, message: "Logged out" });
  });
};
