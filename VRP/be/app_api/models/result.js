const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    idUser: {
      type: String,
      required: true,
    },
    score: {
      type: String,
      required: true,
    },
    correctAnswers: {
      type: String,
      required: true,
    },
    wrongAnswers: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("ResultExam", CourseSchema);
