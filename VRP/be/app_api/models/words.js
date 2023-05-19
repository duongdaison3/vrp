const mongoose = require('mongoose');

const ExampleSchema = new mongoose.Schema({
  data: String,
  meaning: String,
});

const MeaningSchema = new mongoose.Schema({
  data: String,
  examples: [ExampleSchema],
});

const WordDataSchema = new mongoose.Schema({
  type: String,
  meanings: [MeaningSchema],
});

const CollocationSchema = new mongoose.Schema({
  data: String,
  meanings: [MeaningSchema],
});

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    require: true,
    index: { unique: true },
  },
  pronunciation: String,
  datas: [WordDataSchema],
  collocations: [CollocationSchema],
});

mongoose.model('Word', WordSchema);