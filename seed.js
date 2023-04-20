const faker = require("faker");
const { User, Post, Review } = require("./model/db");
const { Op } = require("sequelize");

const NUM_USERS = 1000;
const NUM_POSTS = 50000;
const NUM_REVIEWS = 20000;

async function seed() {
  await User.sync({ force: true });
  await Post.sync({ force: true });
  await Review.sync({ force: true });

  const users = [];
  for (let i = 1; i <= NUM_USERS; i++) {
    users.push({
      username: faker.internet.userName(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  await User.bulkCreate(users);

  const posts = [];
  for (let i = 1; i <= NUM_POSTS; i++) {
    posts.push({
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(),
      userId: faker.random.number({ min: 1, max: NUM_USERS }),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  await Post.bulkCreate(posts);

  const reviews = [];
  for (let i = 1; i <= NUM_REVIEWS; i++) {
    reviews.push({
      rating: faker.random.number({ min: 1, max: 5 }),
      comment: faker.lorem.paragraph(),
      postId: faker.random.number({ min: 1, max: NUM_POSTS }),
      userId: faker.random.number({ min: 1, max: NUM_USERS }),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  await Review.bulkCreate(reviews);

  console.log("Seed completed successfully");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
