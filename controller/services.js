const { Post, Review } = require("../model/db");

const { sequelize } = require("../config/dbconfig");
module.exports = {
  async createPost(req, res) {
    try {
      const { title, body, UserId } = req.body;
      const post = await Post.create({ title, body, UserId });
      res.status(201).json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async listUserPosts(req, res) {
    try {
      const { UserId } = req.params;
      const { page, pageSize } = req.query;
      const offset = (page - 1) * pageSize;
      const limit = pageSize;
      const posts = await Post.findAndCountAll({
        where: { UserId },
        offset,
        limit,
      });
      res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async listTopPosts(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    try {
      const query = `
        SELECT 
          "Post".id, 
          "Post".title, 
          "Post".body, 
          AVG("Reviews".rating) AS "averageRating", 
          COUNT("Reviews".id) AS "reviewCount"
        FROM "Posts" AS "Post"
        LEFT JOIN "Reviews" AS "Reviews" ON "Post".id = "Reviews"."PostId"
        GROUP BY "Post".id
        ORDER BY "averageRating" DESC
        LIMIT :limit OFFSET :offset
      `;
      const posts = await sequelize.query(query, {
        model: Post,
        mapToModel: true,
        replacements: { limit, offset },
      });
      res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async addPostReview(req, res) {
    const PostId = req.params.id;
    const { rating, comment, UserId } = req.body;
    const t = await sequelize.transaction();
    try {
      // Check if the post exists
      const post = await Post.findByPk(PostId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      // Add the review to the post
      const review = await Review.create(
        { rating, comment, PostId, UserId },
        { transaction: t }
      );
      await t.commit();
      res.status(201).json(review);
    } catch (err) {
      await t.rollback();
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
