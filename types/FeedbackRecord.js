class FeedbackRecord {
  constructor(userId, gameId, playSessionId, recordId, rating, comment, date) {
    this.userId = userId;
    this.gameId = gameId;
    this.playSessionId = playSessionId;
    this.recordId = recordId;
    this.rating = rating;
    this.comment = comment;
    this.date = date;
  }
}

// ----------
// MODULE
// ----------

module.exports = FeedbackRecord;
