const mongoose = require("mongoose");
const itinerarySchema = new mongoose.Schema({
  name: { type: String, required: true, min: 4, max: 50 },
  user: { type: mongoose.Types.ObjectId, ref: "users" },
  city: { type: mongoose.Types.ObjectId, ref: "cities" },
  price: { type: Number, required: true, min: 1, max: 5 },
  likes: { type: Array, required: true },
  tags: {
    type: Array,
    required: true,
    validate: function (value) {
      if (value.length > 3) {
        throw new Error("INVALID_LENGTH");
      }
    },
  },
  duration: { type: Number, required: true, min: 1, max: 6 },
});
const Itinerary = mongoose.model("itineraries", itinerarySchema);
module.exports = Itinerary;
