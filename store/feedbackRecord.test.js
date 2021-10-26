const feedbackRecord = require("./feedbackRecord");

describe("when finding a FeedbackRecord for a user", () => {
  test("a record is returned if userId, gameId, and playSessionId match", () => {});
  test("nothing is returned if gameId is different", () => {});
  test("nothing is returned if playSessionId is different", () => {});
});

describe("when fetching all FeedbackRecords", () => {
  test("all records are returned", () => {});
});

describe("when adding new FeedbackRecords", () => {
  test("userId is required", () => {});
  test("gameId is required", () => {});
  test("playSessionId is required", () => {});
  test("rating is required", () => {});
  test("ratings must be numbers", () => {});
  test("ratings must be between 1 and 5 (inclusively)", () => {});
  test("comment is required", () => {});
  test("comment can be empty", () => {});
  test("the result has a recordId", () => {});
  test("the result has a rasonable creation date", () => {});
  test("a user may only submit 1 feedback record per playSession", () => {});
});
