const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const currentUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (!currentUser) {
      res.status(400).json({ message: "Incorrect email or password" });
    }

    const correctPassword = await currentUser.checkPassword(req.body.password);

    if (!correctPassword) {
      res.status(400).json({ message: "Incorrect email or password" });
    }

    req.session.save(() => {
      req.session.user_id = currentUser.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", async (req, res) => {
  if (req.session.logged_in) {
    //Since the session is saved in the database, we "destroy" or delete the session
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
