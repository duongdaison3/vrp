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

const WordModel = mongoose.model('Word', WordSchema);

var readline = require('readline');
var fs = require('fs');
const { exit } = require('process');

var word = "";
var pronunciation = "";

var wordData = {};
wordData['meanings'] = [];
var meaning = {};
meaning['examples'] = [];
meaning['data'] = "";
var example = {};
example['data'] = "";

var collocation = {};
collocation['meanings'] = [];
var flag = 0;

var wordCount = 0;
var exampleCount = 0;
var meaningCount = 0;
var wordDataCount = 0;
var collocationCount = 0;

var trueWord = {};
trueWord['collocations'] = [];
trueWord['datas'] = [];
var myInterface;

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/testdict', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true, }, (e) => {
  if (e) {
    console.log(e);
    process.exit();
  }
  else {
    myInterface = readline.createInterface({
      input: fs.createReadStream('anhviet109K.txt')
    });

    myInterface.on('line', function (line) {
      try {
        if (line.startsWith("@")) {
          if (wordCount > 0) {
            trueWord['word'] = word.trim();
            trueWord['pronunciation'] = pronunciation;
            WordModel.create(trueWord, (err) => {
              if (err) {
                console.log(err);
              }
            });

            word = "";
            pronunciation = "";

            wordData = {};
            wordData['meanings'] = [];
            meaning['examples'] = [];
            meaning['data'] = "";
            example['data'] = "";

            collocation = {};
            collocation['meanings'] = [];
            flag = 0;

            trueWord = {};
            trueWord['collocations'] = [];
            trueWord['datas'] = [];

            exampleCount = 0;
            meaningCount = 0;
            wordDataCount = 0;
            collocationCount = 0;
          }

          items = line.replace('@', '').split('/');
          word = items[0];
          pronunciation = items[1];
          wordCount += 1;
        }
        else if (line.startsWith("* ")) {
          wordData['type'] = line.replace('*', '').trim();
          wordData['meanings'] = [];
          trueWord['datas'].push({ ...wordData });
          wordDataCount += 1;
          exampleCount = 0;
          meaningCount = 0;
          flag = 0;
        }
        else if (line.startsWith("!")) {
          collocation['data'] = line.replace('!', '').trim();
          collocation['meanings'] = [];
          trueWord['collocations'].push({ ...collocation });
          collocationCount += 1;
          exampleCount = 0;
          meaningCount = 0;
          flag = 1;
        }
        else if (line.startsWith("-")) {
          meaning['examples'] = [];
          meaning['data'] = line.replace('-', '').trim();
          if (flag == 0) {
            if (wordDataCount == 0) {
              trueWord['datas'].push({});
              trueWord['datas'][0]['meanings'] = [];
              wordDataCount += 1;
            }
            trueWord['datas'][wordDataCount - 1]['meanings'].push({ ...meaning });

          }
          else if (flag == 1) {
            if (collocationCount == 0) {
              trueWord['collocations'].push({});
              trueWord['collocations'][0]['meanings'] = [];
              wordDataCount += 1;
            }
            trueWord['collocations'][collocationCount - 1]['meanings'].push({ ...meaning });
          }
          meaningCount += 1;
          exampleCount = 0;

        }
        else if (line.startsWith("=")) {
          items = line.replace('=', '').trim().split('+');
          example['data'] = items[0];
          example['meaning'] = items[1];
          if (flag == 0) {
            trueWord['datas'][wordDataCount - 1]['meanings'][meaningCount - 1]['examples'].push({ ...example });
          }
          else if (flag == 1) {
            trueWord['collocations'][collocationCount - 1]['meanings'][meaningCount - 1]['examples'].push({ ...example });
          }
          exampleCount += 1;
        }
      } catch(e){
        console.log(e);
        console.log(line);
        process.exit();
      }
      
    });

    myInterface.on('close', () => {
      console.log(wordCount);
    });
  }
});


