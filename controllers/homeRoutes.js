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
      //   logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("dashboard", {
      blogs,
      //   logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
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
      //   logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
