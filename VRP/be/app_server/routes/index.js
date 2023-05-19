const express = require('express');
const router = express.Router();
const ctrlWords = require('../../app_api/controllers/words');
const ctrlOthers = require('../../app_api/controllers/others');

router.get('/', ctrlWords.wordsByRegex);

router.get('/about', ctrlOthers.about);

module.exports = router;