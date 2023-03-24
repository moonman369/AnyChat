const request = require("request");

describe("calc", () => {
  it("should multiply 2 and 2", () => {
    expect(2 * 2).toBe(4);
  });
});

describe("Get messages", () => {
  it("Should return 200 OK", (done) => {
    request.get("http://localhost:5000/messages", (err, res) => {
      if (err) console.error(err);
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  it("Should return a non-empty list", (done) => {
    request.get("http://localhost:5000/messages", (err, res) => {
      if (err) console.error(err);
      expect(JSON.parse(res.body).length).toBeGreaterThan(0);
      done();
    });
  });
});

describe("Get messages from a user", () => {
  it("Should return 200 OK", (done) => {
    request.get("http://localhost:5000/messages/test", (err, res) => {
      if (err) console.error(err);
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  it("Should return 200 OK", (done) => {
    request.get("http://localhost:5000/messages/moonman", (err, res) => {
      if (err) console.error(err);
      expect(JSON.parse(res.body)[0].name).toEqual("moonman");
      done();
    });
  });
});
