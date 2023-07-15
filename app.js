const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const ExpressError = require("./utils/ExpressError");
const userRoutes = require("./routes/userRoutes");
const campgroundRoutes = require("./routes/campgroundRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

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
// app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sessionConfig = {
  secret: "dfg4df6fh3y5dh797453gd54",
  resave: false,
  saveUninitialized: true, // only for dev
  cookie: {
    httpOnly: true, // security
    expires: Date.now() + 604800000, // after one week (milliseconds)
    maxAge: 604800000,
  },
};
app.use(session(sessionConfig)); // inspect session info at: <api-url> | DevTools -> Application -> Storage -> Cookies

app.use(passport.initialize());
app.use(passport.session()); // must be after app.use(session)
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // storing user in a session
passport.deserializeUser(User.deserializeUser());

app.use("/", userRoutes);

// use the routes defined in routes/campgrounds
// all routes start with /campgrounds
app.use("/campgrounds", campgroundRoutes);

// use the routes defined in routes/reviews
// all routes start with /campgrounds/:id/reviews
app.use("/campgrounds/:id/reviews", reviewRoutes);

// app.use((req, res) => {
//   res.status(404).send("NOT FOUND");
// });

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Not found"));
});

app.use((err, req, res, next) => {
  // only our ExpressError has a err.status
  const { statusCode = 500, message = "Something went wrong" } = err; // destructure with default value
  console.log(err);
  res.status(statusCode).json({ success: false, message });
});

app.listen(3001, () => {
  console.log("serving on port 3001");
});
