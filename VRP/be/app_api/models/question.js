const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    question: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("Question", CourseSchema);
