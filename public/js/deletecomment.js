// function to handle deleting a post
const deleteCommentHandler = async (event) => {
  //   if the id matches the data attribute then...
  const blog_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (event.target.hasAttribute("data-id")) {
    //create an id variable
    const id = event.target.getAttribute("data-id");
    console.log(id);

    //fetch the api/blog/id to run a delete method
    const response = await fetch(`/api/blog/comment/${blog_id}/${id}`, {
      method: "DELETE",
    });

    //if the response if okay then return to the dashboard
    if (response.ok) {
      document.location.replace(`/${blog_id}`);
    } else {
      alert("Failed to delete comment");
    }
  }
};

// add an event listener to the delete post button
document
  .querySelector(".delete-comment")
  .addEventListener("click", deleteCommentHandler);
