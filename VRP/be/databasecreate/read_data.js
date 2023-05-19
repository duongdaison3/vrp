var readline = require('readline');
var fs = require('fs');

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

var myInterface = readline.createInterface({
  input: fs.createReadStream('anhviet.txt')
});

myInterface.on('line', function (line) {
  if (line.startsWith("@")) {
    if (wordCount > 0) {
      trueWord['word'] = word;
      trueWord['pronunciation'] = pronunciation;
      trueWord['collocations'].push({ ...collocation });
      trueWord['datas'].push({ ...wordData });

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
    trueWord['datas'].push({...wordData});
    wordDataCount += 1;
    exampleCount = 0;
    meaningCount = 0;
    flag = 0;
  }
  else if (line.startsWith("!")) {
    collocation['data'] = line.replace('!', '').trim();
    collocation['meanings'] = [];
    trueWord['collocations'].push({...collocation});
    collocationCount += 1;
    exampleCount = 0;
    meaningCount = 0;
    flag = 1;
  }
  else if (line.startsWith("- ")) {
    meaning['examples'] = [];
    meaning['data'] = line.replace('-', '').trim();
    if(flag == 0){
      trueWord['datas'][wordDataCount-1]['meanings'].push({...meaning});
    }
    else if(flag == 1){
      trueWord['collocations'][collocationCount-1]['meanings'].push({...meaning});
    }
    meaningCount += 1;
    exampleCount = 0;

  }
  else if (line.startsWith("=")) {
    items = line.replace('=', '').trim().split('+');
    example['data'] = items[0];
    example['meaning'] = items[1];
    if(flag == 0){
      trueWord['datas'][wordDataCount-1]['meanings'][meaningCount-1]['examples'].push({...example});
    }
    else if(flag == 1){
      trueWord['collocations'][collocationCount-1]['meanings'][meaningCount-1]['examples'].push({...example});
    }
    exampleCount+=1;
  }
});