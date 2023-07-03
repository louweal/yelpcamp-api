const express = require("express");
// const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/catchAsync");
const { campgroundSchema } = require("./schemas.js");

const Campground = require("./models/campground");

// choose whatever name,  port is default
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
  console.log("Database connected");
});

const app = express();

//app.use => runs code on every request (~= middleware)
app.use(morgan("dev")); // logs request information in the console
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);

  if (error) {
    console.log(error);
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

app.get(
  "/campgrounds",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.json(campgrounds);
  })
);

app.get(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.json(campground);
  })
);

app.post(
  "/campgrounds",
  validateCampground,
  catchAsync(async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.json(campground);
  })
);

app.get(
  "/campgrounds/:id/edit",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.json(campground);
  })
);

app.put(
  "/campgrounds/:id",
  validateCampground,
  catchAsync(async (req, res) => {
    console.log(req.body);
    await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground });
    res.send("SUCCESS");
  })
);

app.delete(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.send("SUCCESS");
  })
);

// app.use((req, res) => {
//   res.status(404).send("NOT FOUND");
// });

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Not found"));
});

// example: throw new ExpressError(403, "You are not an admin.")

app.use((err, req, res, next) => {
  // only our ExpressError has a err.status
  const { statusCode = 500, message = "Something went wrong" } = err; // destructure with default value
  res.status(statusCode).send(message);
});

app.listen(3001, () => {
  console.log("serving on port 3001");
});
