const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");

chai.use(chaiHttp);
const expect = chai.expect;

// API to add a post
describe("POST /posts", () => {
  it("should create a new post", (done) => {
    const post = {
      title: "Test Post",
      body: "This is a test post",
      userId: 1,
    };
    chai
      .request(app)
      .post("/posts")
      .send(post)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.title).to.equal(post.title);
        expect(res.body.body).to.equal(post.body);
        expect(res.body.userId).to.equal(post.userId);
        done();
      });
  });
});

// API to list user posts with pagination
describe("GET /users/:userId/posts", () => {
  it("should return a list of user posts", (done) => {
    chai
      .request(app)
      .get("/users/1/posts?page=1&pageSize=10")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.count).to.be.a("number");
        expect(res.body.rows).to.be.an("array");
        done();
      });
  });
});

// API to get top posts with pagination
describe("GET /posts/top", () => {
  it("should return a list of top posts", (done) => {
    chai
      .request(app)
      .get("/posts/top?page=1&limit=10")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.at.most(10);
        done();
      });
  });
});

// API to add a review to a post
describe("POST /posts/:id/reviews", () => {
  it("should add a review to the post", (done) => {
    const review = {
      rating: 4,
      comment: "This is a test review",
      userId: 1,
    };
    chai
      .request(app)
      .post("/posts/1/reviews")
      .send(review)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.rating).to.equal(review.rating);
        expect(res.body.comment).to.equal(review.comment);
        expect(res.body.postId).to.equal(1);
        expect(res.body.userId).to.equal(review.userId);
        done();
      });
  });
});
