const mongoose = require('mongoose');

const WordGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  wordIds: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Words',
    }],
    validate: [arrayLimit, 'Words exceeds the limit of 100']
  }

});

function arrayLimit(val) {
  return val.length <= 100;
}

WordGroupSchema.index({ name: 1, owner: 1 }, { unique: true });
WordGroupSchema.pre('save', function (next) {
  this.wordIds = this.wordIds.filter((v, i, a) => a.indexOf(v) === i);
  console.log(this.wordIds);
  next();
});
mongoose.model('WordGroup', WordGroupSchema);