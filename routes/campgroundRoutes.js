const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware.js");
const campgroundController = require("../controllers/campgroundController");

router
  .route("/")
  .get(catchAsync(campgroundController.getCampgrounds))
  .post(isLoggedIn, validateCampground, catchAsync(campgroundController.createCampground));

router
  .route("/:id")
  .get(catchAsync(campgroundController.showCampground))
  .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundController.updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campgroundController.deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgroundController.showCampgroundFields));

module.exports = router;
