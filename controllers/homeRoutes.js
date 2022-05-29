//require the express router, the three models, and the withAuth util
const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//When on the home route get all the blogs with the user that created the post
router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    //Make all the blogs into a plain json array
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    //render the homepage handlebars file and set the logged_in variable
    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
    //if there is an error, catch it
  } catch (err) {
    res.status(500).json(err);
  }
});

//when at /dashboard route, only if logged in, gather the blogs that match the user_id, including the user name
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

    // Serialize data into a plain javascript object
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Render the dashboard handlebars file using the blogs array
    res.render("dashboard", {
      blogs,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//when at a given id - find the blog by primary key that matches the blog_id, including all comments associated with the post and the user name
router.get("/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "date_created",
            "user_id",
            "blog_id",
          ],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
      nest: true,
    });
    // serialize
    const blog = blogData.get({ plain: true });

    //render the comment handlebars file
    res.render("comment", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//when at update/id (i.e. 1), only with authentication find the blog based on the id, including the user
router.get("/update/:id", withAuth, async (req, res) => {
  try {
    const updateData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
      nest: true,
    });

    const update = updateData.get({ plain: true });

    //render the update handlebars file
    res.render("update", {
      ...update,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//export all the routes
module.exports = router;
