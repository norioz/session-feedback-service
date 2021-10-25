/**
 * FeedbackRecord is a DAO that represents the user feedback given after
 * a game play session.
 *
 * FeedbackRecords cannot be edited after being created.
 *
 * Only 1 FeedbackRecord can be submitted per user per playSession,
 * so a userId + gameId + playSessionId should be unique.
 *
 * Fields:
 * userId - ID of the user submitting the feedback
 * gameId - ID of the game that was played
 * playSessionId - ID of the playSession that the feedback corresponds to
 * recordId - ID of the feedback record
 * rating - a "star rating" as a number between 1 and 5 (inclusively)
 * comment - a user supplied comment
 * creationDate - a UNIX timestamp indicating when the feedback was recorded
 */
class FeedbackRecord {
  constructor(
    userId,
    gameId,
    playSessionId,
    recordId,
    rating,
    comment,
    creationDate
  ) {
    this.userId = userId;
    this.gameId = gameId;
    this.playSessionId = playSessionId;
    this.recordId = recordId;
    this.rating = rating;
    this.comment = comment;
    this.creationDate = creationDate;
  }
}

// ----------
// MODULE
// ----------

module.exports = FeedbackRecord;
