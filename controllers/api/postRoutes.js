const router = require("express").Router();
const { Post, Comment } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      description: req.body.description,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// /api/post/id/comment
router.post("/:id/comment", async (req, res) => {
  try {
    const newComment = await Comment.create({
      description: req.body.comment,
      post_id: req.params.id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
