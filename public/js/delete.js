// function to handle deleting a post
const deletePostHandler = async (event) => {
  //if the id matches the data attribute then...
  if (event.target.hasAttribute("data-id")) {
    //create an id variable
    const id = event.target.getAttribute("data-id");

    //fetch the api/blog/id to run a delete method
    const response = await fetch(`/api/blog/${id}`, {
      method: "DELETE",
    });

    //if the response if okay then return to the dashboard
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete project");
    }
  }
};

// add an event listener to the delete post button
document
  .querySelector(".delete-post")
  .addEventListener("click", deletePostHandler);
