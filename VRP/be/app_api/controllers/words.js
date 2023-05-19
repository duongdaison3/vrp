const mongoose = require("mongoose");
const WordModel = mongoose.model("Word");
const QuestionModel = mongoose.model("Question");

const wordsByRegex = (req, res) => {
  WordModel.find({ word: new RegExp("^" + req.params.word, "i") }, "word")
    .lean()
    .limit(10)
    .sort({ word: 1 })
    .exec((err, words) => {
      if (!words) {
        return res.status(404).json({
          success: false,
          message: "words not found",
        });
      } else if (err) {
        return res.status(404).json({
          success: false,
          message: err,
        });
      } else {
        return res.status(200).json({
          success: true,
          data: words,
        });
      }
    });
};

const wordByName = (req, res) => {
  WordModel.findOne({
    word: new RegExp("^" + req.params.wordName + "$", "i"),
  }).exec((err, words) => {
    if (!words) {
      return res.status(404).json({
        success: false,
        message: "words not found",
      });
    } else if (err) {
      return res.status(404).json({
        success: false,
        message: err,
      });
    } else {
      return res.status(200).json({
        success: true,
        data: words,
      });
    }
  });
};

const wordById = (req, res) => {
  WordModel.findbyId(req.params.wordId).exec((err, words) => {
    if (!words) {
      return res.status(404).json({
        success: false,
        message: "words not found",
      });
    } else if (err) {
      return res.status(404).json({
        success: false,
        message: err,
      });
    } else {
      return res.status(200).json({
        success: true,
        data: words,
      });
    }
  });
};

const showAllWord = (req, res) => {
  WordModel.find({})
    .limit(1000)
    .sort({ word: 1 })
    .exec((err, words) => {
      if (!words) {
        return res.status(404).json({
          success: false,
          message: "words not found",
        });
      } else if (err) {
        return res.status(404).json({
          success: false,
          message: err,
        });
      } else {
        return res.status(200).json({
          success: true,
          data: words,
        });
      }
    });
};

const addQuestion = async (req, res) => {
  try {
    const resa = new QuestionModel(req.body);
    resa.save();
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
    });
  }
};

const getQuestion = async (req, res) => {
  QuestionModel.find({}).exec((err, words) => {
    if (!words) {
      return res.status(404).json({
        success: false,
        message: "words not found",
      });
    } else if (err) {
      return res.status(404).json({
        success: false,
        message: err,
      });
    } else {
      return res.status(200).json({
        success: true,
        data: words,
      });
    }
  });
};

const findQuestion = (req, res) => {
  WordModel.find(
    {
      pronunciation: new RegExp("^" + req.params.text.slice(0, 2), "i"),
    },
    "word"
  )
    .lean()
    .limit(3)
    .exec((err, words) => {
      if (!words) {
        return res.status(404).json({
          success: false,
          message: "words not found",
        });
      } else if (err) {
        return res.status(404).json({
          success: false,
          message: err,
        });
      } else {
        return res.status(200).json({
          success: true,
          data: words,
        });
      }
    });
};

const deleteQuestion = async (req, res) => {
  QuestionModel.findByIdAndDelete(req.params.id).exec((err, wGroup) => {
    if (err) {
      return res.status(404).json(err);
    } else {
      return res.status(200).json({ success: true });
    }
  });
};

module.exports = {
  wordsByRegex,
  wordByName,
  wordById,
  showAllWord,
  addQuestion,
  getQuestion,
  findQuestion,
  deleteQuestion,
};
