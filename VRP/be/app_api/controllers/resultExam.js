const mongoose = require("mongoose");
const ResultExam = mongoose.model("ResultExam");
const User = mongoose.model("User");

const addResult = async (req, res) => {
  try {
    const resa = new ResultExam(req.body);
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

const getTop = async (req, res) => {
  try {
    const name = await User.findOne({ _id: req.params.id });
    const data = await ResultExam.find({ idUser: req.params.id });
    return res.status(200).json({
      data: data || [],
      name: name,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

module.exports = {
  addResult,
  getTop,
};
