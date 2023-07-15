const express = require("express");
const router = express.Router({ mergeParams: true }); // because we also need to include the param 'id' from /campground/:id/reviews
const catchAsync = require("../utils/catchAsync");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviewController");

router.post("/", isLoggedIn, validateReview, catchAsync(reviewController.createReview));
router.delete("/:rid", isLoggedIn, isReviewAuthor, catchAsync(reviewController.deleteReview));

module.exports = router;
