const express = require("express");
const bodyParser = require("body-parser");
const controller = require("./controller/services");

const app = express();
app.use(bodyParser.json());

// Routes
app.post("/posts", controller.createPost);
app.get("/users/:userId/posts", controller.listUserPosts);
app.get("/posts/top", controller.listTopPosts);
app.post("/posts/:id/reviews", controller.addPostReview);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
