const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Comment,
        },
      ],
      raw: true,
      nest: true,
    });

    const blogs = blogData;

    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs);

    // Pass serialized data and session flag into template
    res.render("dashboard", {
      blogs,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
          model: Comment,
          attributes: ["comment_text"],
        },
      ],
      raw: true,
      nest: true,
    });

    const blog = blogData;
    console.log(blog);

    // const blog = blogData.get({ plain: true });

    res.render("comment", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:id", async (req, res) => {
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

router.get("/update/:id", withAuth, async (req, res) => {
  try {
    const updateData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
      raw: true,
      nest: true,
    });

    const update = updateData;
    console.log(update);

    // const blog = blogData.get({ plain: true });

    res.render("update", {
      ...update,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
