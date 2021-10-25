class FeedbackRecord {
  constructor(userId, gameId, playSessionId, recordId, rating, comment) {
    this.userId = userId;
    this.gameId = gameId;
    this.playSessionId = playSessionId;
    this.recordId = recordId;
    this.rating = rating;
    this.comment = comment;
  }
}

// ----------
// MODULE
// ----------

module.exports = FeedbackRecord;
