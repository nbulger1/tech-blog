//require the connection file and the three models
const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");

//require all of the seed data
const userData = require("./userData.json");
const blogData = require("./blogData.json");
const commentData = require("./commentData.json");

// function to handle seeding the database
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // create all of the users with userdata in the json file and the hooks as well
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // for the blog data create a blog and randomly create the user_id
  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // for the comemnt data create a comment and randomly create the user_id as well as blog_id
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      blog_id: users[Math.floor(Math.random() * users.length)].id,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

//call the seed database function
seedDatabase();
