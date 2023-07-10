const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new ExpressError(401, "Unauthorized");
  }
  next();
};
