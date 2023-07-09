const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  // todo
  // console.log(req.user);
  // console.log(req.session.passport);
  // console.log("auth? " + req.isAuthenticated());
  // if (!req.isAuthenticated()) {
  //   throw new ExpressError(401, "Unauthorized");
  // }
  next();
};
