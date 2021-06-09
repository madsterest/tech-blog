const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

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

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User }],
    });

    const posts = userPosts.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      logged_in: true,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/dashboard/:id", async (req, res) => {
  try {
    const onePost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["description", "user_id", "date_created"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const posts = onePost.get({ plain: true });

    res.render("dashboardpost", {
      ...posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const onePost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["description", "user_id", "date_created"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const posts = onePost.get({ plain: true });

    res.render("singlepost", {
      ...posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/post/edit/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    const posts = postData.get({ plain: true });

    res.render("editpost", {
      ...posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(00).json(err);
  }
});

router.get("/post/:id/comment", withAuth, async (req, res) => {
  try {
    const onePost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["description", "user_id", "date_created"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const posts = onePost.get({ plain: true });

    res.render("postcomment", {
      ...posts,
      logged_in: true,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/test/:id", async (req, res) => {
  try {
    const onePost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["description", "user_id", "date_created"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const posts = onePost.get({ plain: true });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
