const FeedbackRecord = require("../types/FeedbackRecord");
const { v4: uuidv4 } = require("uuid");

require("../types/FeedbackRecord");

// --------
// In-memory Store
// --------

var FEEDBACK_RECORDS = [];

// --------
// CRUD
// --------

/**
 * Fetches a list of all FeedbackRecords.
 * @return Array<FeedbackRecord> - the list of records
 */
var list = function () {
  // Return an array copy for idempotency, in case we want the storage order to be specified.
  // WARNING This doesn't protect from the records themselves being modified.
  return [...FEEDBACK_RECORDS];
};

/**
 * Fetches a FeedbackRecord with the given userId, gameId, and playSessionId.
 * @param userId:ID - ID of a user that submitted feedback.
 * @param gameId:ID - ID of a game.
 * @param playSessionId:ID - ID of a playSession that the user submitted feedback for.
 * @return FeedbackRecord | null - the FeedbackRecord that matches the params or null if none was found.
 */
var find = function (userId, gameId, playSessionId) {
  for (var feedbackRecord in FEEDBACK_RECORDS) {
    if (
      feedbackRecord.userId === userId &&
      feedbackRecord.gameId === gameId &&
      feedbackRecord.playSessionId === playSessionId
    ) {
      return feedbackRecord;
    }
  }
  return null;
};

/**
 * Stores a new FeedbackRecord.
 * @param userId:ID - ID of the user that filed the feedback.
 * @param gameId:ID - ID of the game that the feedback is for.
 * @param playSessionId:ID - ID of the playSession (match) that the feedback is for.
 * @param rating:number - a "star" rating between 1 and 5.
 * @param comment:sting - a user supplied text comment for the feedback.
 * @return FeedbackRecord - the created record
 */
var create = function (userId, gameId, playSessionId, rating, comment) {
  if (!userId) throw new Error("userId required to create FeedbackRecord");
  if (!gameId) throw new Error("gameId required to create FeedbackRecord");
  if (!playSessionId)
    throw new Error("playSessionId required to create FeedbackRecord");
  if (!rating) throw new Error("rating required to create FeedbackRecord");
  if (typeof rating !== "number") throw new Error("rating must be a number");
  if (rating < 1 || rating > 5)
    throw new Error("rating must be between 1 and 5");
  if (comment === null)
    throw new Error(
      "comment is required to create a FeedbackRecord but may be empty"
    );
  if (typeof comment !== "string") throw new Error("comment must be a string");
  // check that no FeedbackRecord exists for this userId + gameId + playSessionId.
  const record = find(userId, gameId, playSessionId);
  if (record !== null)
    throw new Error(
      `the user (${userId}) has already submitted feedback for the playSession (${playSessionId})`
    );
  var feedbackRecord = new FeedbackRecord(
    userId,
    gameId,
    playSessionId,
    uuidv4(),
    rating,
    comment,
    Date.now()
  );
  FEEDBACK_RECORDS.push(feedbackRecord);
  return feedbackRecord;
};

// ----------
// MODULE
// ----------

module.exports = {
  create: create,
  read: find,
  list: list,
};
