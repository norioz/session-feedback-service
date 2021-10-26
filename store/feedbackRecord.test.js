const feedbackRecord = require("./feedbackRecord");

// ---------
// TEST DATA
// ---------

const userId = "test-user-id";
const gameId = "test-game-id";
const playSessionId = "test-play-session-id";
const rating = 5;
const comment = "fun times!";

let playSessionIdx = 0;
const getTestPlaySessionId = function () {
  return "test-play-session-id-" + playSessionIdx++;
};

// ---------
// TESTS
// ---------

// Test Find FeedbackRecords
describe("when finding a FeedbackRecord for a user", () => {
  test("a record is returned if userId, gameId, and playSessionId match", () => {});
  test("nothing is returned if gameId is different", () => {});
  test("nothing is returned if playSessionId is different", () => {});
});

// Test List FeedbackRecords
describe("when fetching all FeedbackRecords", () => {
  test("all records are returned", () => {});
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
  test("the result has a rasonable creation date", () => {});
  test("a user may only submit 1 feedback record per playSession", () => {});
});
