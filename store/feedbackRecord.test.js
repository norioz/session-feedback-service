const feedbackRecord = require("./feedbackRecord");

// ---------
// TEST DATA
// ---------

const userId = "test-user-id";
const gameId = "test-game-id";
const playSessionId = "test-play-session-id";
const rating = 5;
const comment = "fun times!";

let numberIter = 0;
const getTestPlaySessionId = function () {
  return "test-play-session-id-" + numberIter++;
};

let testFeedbackRecord = null;
const reinitializeTestFeedbackRecord = function () {
  testFeedbackRecord = feedbackRecord.create(
    userId,
    gameId,
    getTestPlaySessionId(),
    rating,
    comment
  );
};

const createFeedbackRecords = function (numberToCreate) {
  for (var i = 0; i < numberToCreate; i++) {
    const suffix = numberIter++;
    feedbackRecord.create(
      userId + suffix,
      gameId + suffix,
      playSessionId + suffix,
      (suffix % 5) + 1,
      comment + suffix
    );
  }
};

// ---------
// TESTS
// ---------

// Test Find FeedbackRecords
describe("when finding a FeedbackRecord for a user", () => {
  beforeEach(() => {
    reinitializeTestFeedbackRecord();
  });
  test("a record is returned if userId, gameId, and playSessionId match", () => {
    const record = feedbackRecord.find(
      testFeedbackRecord.userId,
      testFeedbackRecord.gameId,
      testFeedbackRecord.playSessionId
    );
    expect(record).not.toBeNull();
  });
  test("nothing is returned if userId is different", () => {
    const record = feedbackRecord.find(userId + "foo", gameId, playSessionId);
    expect(record).toBeNull();
  });
  test("nothing is returned if gameId is different", () => {
    const record = feedbackRecord.find(userId, gameId + "foo", playSessionId);
    expect(record).toBeNull();
  });
  test("nothing is returned if playSessionId is different", () => {
    const record = feedbackRecord.find(userId, gameId, playSessionId + "foo");
    expect(record).toBeNull();
  });
});

// Test Clear FeedbackRecords from store
describe("when the FeedbackRecords are cleared from the store", () => {
  test("list returns 0 records", () => {
    createFeedbackRecords(10);
    expect(feedbackRecord.list().length).toBeGreaterThan(0);
    feedbackRecord.clear();
    expect(feedbackRecord.list().length).toBe(0);
  });
});

// Test List FeedbackRecords
describe("when listing all FeedbackRecords", () => {
  test("all records are returned", () => {
    feedbackRecord.clear(); // clear to ensure that there are no records
    const recordCount = 20;
    createFeedbackRecords(recordCount);
    const records = feedbackRecord.list();
    expect(records.length).toBe(recordCount);
  });
  test("records are different from each other", () => {
    const records = feedbackRecord.list();
    const targetUserId = records[5].userId;
    const targetGameId = records[5].gameId;
    const targetPlaySessionId = records[5].playSessionId;
    let recordsThatMatch = 0;
    for (var record of records) {
      if (
        record.userId === targetUserId &&
        record.gameId === targetGameId &&
        record.playSessionId === targetPlaySessionId
      ) {
        recordsThatMatch++;
      }
    }
    expect(recordsThatMatch).toBe(1);
  });
});

// Test Create FeedbackRecord
describe("when adding new FeedbackRecords", () => {
  test("everything works with expected input", () => {
    expect(
      feedbackRecord.create(
        userId,
        gameId,
        getTestPlaySessionId(),
        rating,
        comment
      )
    ).not.toBeNull();
  });
  test("userId is required", () => {
    expect(() => {
      feedbackRecord.create(
        "",
        gameId,
        getTestPlaySessionId(),
        rating,
        comment
      );
    }).toThrow();
    expect(() => {
      feedbackRecord.create(
        null,
        gameId,
        getTestPlaySessionId(),
        rating,
        comment
      );
    }).toThrow();
  });
  test("gameId is required", () => {
    expect(() => {
      feedbackRecord.create(
        userId,
        "",
        getTestPlaySessionId(),
        rating,
        comment
      );
    }).toThrow();
    expect(() => {
      feedbackRecord.create(
        userId,
        null,
        getTestPlaySessionId(),
        rating,
        comment
      );
    }).toThrow();
  });
  test("playSessionId is required", () => {
    expect(() => {
      feedbackRecord.create(userId, gameId, "", rating, comment);
    }).toThrow();
    expect(() => {
      feedbackRecord.create(userId, gameId, null, rating, comment);
    }).toThrow();
  });
  test("rating is required", () => {
    expect(() => {
      feedbackRecord.create(
        userId,
        gameId,
        getTestPlaySessionId(),
        null,
        comment
      );
    }).toThrow();
  });
  test("ratings must be numbers", () => {
    expect(() => {
      feedbackRecord.create(
        userId,
        gameId,
        getTestPlaySessionId(),
        "1",
        comment
      );
    }).toThrow();
  });
  test("ratings must be integers between 1 and 5 (inclusively)", () => {
    expect(() => {
      feedbackRecord.create(userId, gameId, getTestPlaySessionId(), 0, comment);
    }).toThrow();
    expect(() => {
      feedbackRecord.create(userId, gameId, getTestPlaySessionId(), 6, comment);
    }).toThrow();
    expect(() => {
      feedbackRecord.create(
        userId,
        gameId,
        getTestPlaySessionId(),
        1.1,
        comment
      );
    }).toThrow();
    expect(() => {
      feedbackRecord.create(
        userId,
        gameId,
        getTestPlaySessionId(),
        5.00001,
        comment
      );
    }).toThrow();
    for (var i = 1; i < 6; i++) {
      expect(
        feedbackRecord.create(userId, gameId, playSessionId + i, i, comment)
      );
    }
  });
  test("comment is required", () => {
    expect(() => {
      feedbackRecord.create(
        userId,
        gameId,
        getTestPlaySessionId(),
        rating,
        null
      );
    }).toThrow();
  });
  test("comment must be a string", () => {
    expect(() => {
      feedbackRecord.create(userId, gameId, getTestPlaySessionId(), rating, 2);
    }).toThrow();
  });
  test("comment can be empty", () => {
    expect(
      feedbackRecord.create(userId, gameId, getTestPlaySessionId(), rating, "")
    ).not.toBeNull();
  });
  test("the result has a recordId", () => {
    const record = feedbackRecord.create(
      userId,
      gameId,
      getTestPlaySessionId(),
      rating,
      comment
    );
    expect(record).not.toBeNull();
    expect(record.recordId).toBeDefined();
  });
  test("the result has a rasonable creation date", () => {
    const now = Date.now();
    const record = feedbackRecord.create(
      userId,
      gameId,
      getTestPlaySessionId(),
      rating,
      comment
    );
    expect(record).not.toBeNull();
    const delta = record.creationDate - now;
    expect(delta).toBeLessThan(60000); // one minute in ms
  });
  test("a user may only submit 1 feedback record per playSession", () => {
    const record = feedbackRecord.create(
      userId,
      gameId,
      getTestPlaySessionId(),
      rating,
      comment
    );
    expect(() => {
      feedbackRecord.create(
        userId,
        gameId,
        record.playSessionId,
        2,
        "different comment"
      );
    }).toThrow();
  });
});
