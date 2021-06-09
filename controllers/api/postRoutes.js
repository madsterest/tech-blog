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

router.put("/edit/:id", async (req, res) => {
  try {
    const editPost = await Post.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(editPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: { id: req.params.id },
    });
    if (!deletePost) {
      res(404).json({ message: "No project found with that ID" });
    }
    res.status(200).json(deletePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
