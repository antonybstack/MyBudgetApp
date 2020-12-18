const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Category = new Schema({
  category_name: {
    type: String,
    required: "category name is required",
  },
  category_totals: {
    type: [Number],
    default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    required: "array of totals is required",
  },
  category_year: {
    type: String,
    required: "year is required",
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Category = mongoose.model("Category", Category);
