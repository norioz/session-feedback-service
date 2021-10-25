var express = require("express");
var router = express.Router();
var store = require("../store");

/* GET a list of all feedback records. */
router.get("/", function (req, res, next) {
  const feedbackRecords = store.feedbackRecord.list();
  res.json(JSON.stringify(feedbackRecords));
});

/* POST a feedback record. Creates a new feedback record. */
router.post("/", function (req, res, next) {
  const { userId, gameId, playSessionId, rating, comment } = req.body;
  const feedbackRecord = store.feedbackRecord.create(
    userId,
    gameId,
    playSessionId,
    rating,
    comment
  );
  res.json(JSON.stringify(feedbackRecord));
});

module.exports = router;
