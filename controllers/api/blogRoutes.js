const router = require("express").Router();
const { Blog } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newPost = await Blog.create({
      ...req.body,
      //   user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});
