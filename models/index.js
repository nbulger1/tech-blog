//require all three models
const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

//a user can have many blogs based on the foreign key "user_id"
User.hasMany(Blog, {
  foreignKey: "user_id",
});

//blogs belong to the one user and when a user is deleted, delete their blog posts as well
Blog.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//comments belong to each blog and if a blog is deleted then delete the comments as well
Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

//comments also belong to a user, if a user is deleted then delete the comments they have written as well
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// blogs can have many comments
Blog.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

//a user can have many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//export the three models
module.exports = { User, Blog, Comment };
