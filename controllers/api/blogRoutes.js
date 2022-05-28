const router = require("express").Router();
const { Blog, Comment } = require("../../models");

router.get("/newpost", async (req, res) => {
  try {
    res.render("newPost");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/newpost", async (req, res) => {
  try {
    const newPost = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/updatepost", async (req, res) => {
  try {
    const updatePost = await Blog.update({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
