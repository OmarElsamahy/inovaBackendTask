const { User, Post, Review } = require("./model/db");

async function seed() {
  // create 100 users
  for (let i = 1; i <= 100; i++) {
    await User.create({ username: `user_${i}` });
  }

  // create 50k posts
  for (let i = 1; i <= 50000; i++) {
    const UserId = Math.ceil(Math.random() * 100); // assign a random user ID to each post
    await Post.create({
      title: `Post ${i}`,
      body: `This is the body of post ${i}.`,
      UserId,
    });
  }

  // create 20k reviews
  for (let i = 1; i <= 20000; i++) {
    const PostId = Math.ceil(Math.random() * 50000); // assign a random post ID to each review
    const UserId = Math.ceil(Math.random() * 100); // assign a random user ID to each review
    await Review.create({
      rating: Math.ceil(Math.random() * 5), // assign a random rating between 1 and 5
      comment: `This is the comment for review ${i}.`,
      PostId,
      UserId,
    });
  }

  console.log("Seed complete.");
}

seed();
