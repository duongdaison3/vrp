const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");
const auth = jwt({
  secret: "webprograming",
  userProperty: "payload",
  algorithms: ["sha1", "RS256", "HS256"],
});

const ctrlWords = require("../controllers/words");
const ctrlAuth = require("../controllers/authentication");
const ctrWordGroups = require("../controllers/wordGroup");
const ctrResult = require("../controllers/resultExam");

router.route("/wordsByRegex/:word").get(ctrlWords.wordsByRegex);

router.route("/wordByName/:wordName").get(ctrlWords.wordByName);

router.route("/wordById/:wordId").get(ctrlWords.wordById);

router.route("/show-all-word").get(ctrlWords.showAllWord);

router.route("/save-question").post(ctrlWords.addQuestion);

router.route("/delete-question/:id").delete(ctrlWords.deleteQuestion);

router.route("/get-list-question").get(ctrlWords.getQuestion);

router.route("/question/:text").get(ctrlWords.findQuestion);

router
  .route("/wordGroups")
  .get(ctrWordGroups.getAllWordGroups)
  .put(auth, ctrWordGroups.createWordGroup);

router
  .route("/wordGroups/:wordGroupId")
  .get(auth, ctrWordGroups.getWordGroup)
  .put(auth, ctrWordGroups.updateWordGroup)
  .delete(auth, ctrWordGroups.deleteWordGroup);

router
  .route("/wordGroups/:wordGroupId/words/:wordId")
  .get(auth, ctrWordGroups.getWordFromGroup)
  .put(auth, ctrWordGroups.addWordToGroup)
  .delete(auth, ctrWordGroups.deleteWordFromGroup);

router.route("/me").get(auth, ctrlAuth.userInfo);

router.post("/register", ctrlAuth.register);
router.post("/login", ctrlAuth.login);

router.post("/add-top", ctrResult.addResult);
router.get("/get-top/:id", ctrResult.getTop);

module.exports = router;
