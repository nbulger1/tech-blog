//require the express router, two models: blog and comment, and the withAuth util
const router = require("express").Router();
const { Blog, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

//when at /api/blog/newpost render the newpost handlebars file
router.get("/newpost", withAuth, async (req, res) => {
  try {
    res.render("newPost");
  } catch (err) {
    res.status(500).json(err);
  }
});

// when at api/blog/newpost if fetch call is made then create a blog using the request body supplied in the fetch call and set the user id to the id of the logged in individual
router.post("/newpost", withAuth, async (req, res) => {
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

// at api/blog/id (ie 1) when update the blog post that matches the id using the request body provided
router.put("/:id", withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    console.log(blogData);
    if (!blogData[0]) {
      res.status(404).json({ message: "No category with this id!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// at api/blog/id destroy the post that matches the id provided
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// at api/blog/comment when a request is made then create a comment using the request body and set the user_id to the id of the individual that is logged in
router.post("/comment", withAuth, async (req, res) => {
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

router.get("/deleteComment/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ["name"],
      },
    });

    const comment = commentData.get({ plain: true });
    console.log(comment);
    res.render("deleteComment", {
      ...comment,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// at api/blog/comment/:id when delete request is made, destroy the comment that matches the given id - not functioning right now
router.delete("/comment/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    console.log(commentData);
    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//export all the routes
module.exports = router;
