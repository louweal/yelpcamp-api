const Campground = require("../models/campground");

module.exports.getCampgrounds = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.json({ success: true, campgrounds });
};

module.exports.createCampground = async (req, res) => {
  const campground = new Campground(req.body.campground);
  campground.author = req.user._id;
  await campground.save();
  res.json({ success: true, campground: campground });
};

module.exports.showCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");

  if (!campground) return res.json({ success: false, message: "Campground not found" });

  res.json({ success: true, campground });
};

module.exports.showCampgroundFields = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  if (!campground) res.json({ success: false, message: "Campground doesn't exist" });
  res.json({ success: true, campground });
};

module.exports.updateCampground = async (req, res) => {
  await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground });
  res.json({ success: true });
};

module.exports.deleteCampground = async (req, res) => {
  await Campground.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
