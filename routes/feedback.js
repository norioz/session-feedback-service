var express = require("express");
var router = express.Router();
var store = require("../store");

/**
 * GET (all) FeedbackRecord
 * Lists all feedback records.
 */
router.get("/", function (req, res, next) {
  const feedbackRecords = store.feedbackRecord.list();
  res.json(JSON.stringify(feedbackRecords));
});

/**
 * POST FeedbackRecord
 * Creates a new FeedbackRecord.
 * The JSON representing the FeedbackRecord is returned in the response payload.
 */
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
