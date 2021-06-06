const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = allPosts.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/post", async (req, res) => {
  res.render("newpost", { logged_in: req.session.logged_in });
});

router.get("/dashboard", async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User }],
    });

    const posts = userPosts.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  res.render();
  // create individual Post View
});

module.exports = router;
