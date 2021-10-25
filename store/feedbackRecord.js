const FeedbackRecord = require("../types/FeedbackRecord");
const { v4: uuidv4 } = require("uuid");

require("../types/FeedbackRecord");

// --------
// FeedbackRecord In-memory store
// --------

var FEEDBACK_RECORDS = [];

// --------
// FeedbackRecord CRUD
// --------

/**
 * Fetches a list of all FeedbackRecords.
 * @return Array<FeedbackRecord> - the list of records
 */
var list = function () {
  return [...FEEDBACK_RECORDS];
};

/**
 * Fetches a FeedbackRecord with the given recordId.
 * @param recordId:ID The ID of a record to fetch.
 * @return FeedbackRecord | null - the FeedbackRecord that matches the recordId or null if none was found.
 */
var read = function (recordId) {
  for (var feedbackRecord in FEEDBACK_RECORDS) {
    if (feedbackRecord.recordId === recordId) {
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
  // TODO (Brett) null checks
  // TODO (Brett) rating must be a number between 1 and 5
  // TODO (Brett) check to see if the userId + gameId + playSessionId has been used.
  var feedbackRecord = new FeedbackRecord(
    userId,
    gameId,
    playSessionId,
    uuidv4(),
    rating,
    comment
  );
  FEEDBACK_RECORDS.push(feedbackRecord);
  return feedbackRecord;
};

// ----------
// MODULE
// ----------

module.exports = {
  create: create,
  read: read,
  list: list,
};
