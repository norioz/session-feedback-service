const feedbackRecord = require("./feedbackRecord");

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
