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

router.put("/:id", async (req, res) => {
  try {
    const updatePost = await Blog.update(
      {
        title: req.body.title,
        text: req.body.text,
        key_phrase: req.body.key_phrase,
      },
      {
        where: {
          id: req.params.id,
        },
      },
      res.status(200).json(updatePost)
    );
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/comment", async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
