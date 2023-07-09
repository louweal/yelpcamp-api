const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({}); // delete all existing data

  for (let i = 0; i < 50; i++) {
    const r = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;

    const camp = new Campground({
      location: `${cities[r].city}, ${cities[r].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt ab repellendus a autem corrupti voluptatibus cumque rerum odio, tempore cum. Tempora aperiam necessitatibus laborum obcaecati aliquam velit est, excepturi doloremque.",
      price: price,
      reviews: [],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
