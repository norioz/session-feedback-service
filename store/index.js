var feedbackRecord = require("./feedbackRecord");

/**
 * The store represents the main in-memory DB interface.
 * Using the store should refer to data types within it by reference.
 * Eg: store.feedbackRecord.create()
 *
 * This allows users of the store to require only the "store" directory.
 */

const store = {
  feedbackRecord: feedbackRecord,
};

// ----------
// MODULE
// ----------

module.exports = store;
