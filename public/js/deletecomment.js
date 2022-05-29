//function to delete a comment
const deleteCommentHandler = async (event) => {
  event.preventDefault();

  //take the input text value from the exampleComment id
  const id = event.target.getAttribute("data-id");

  //if the comment_text is present then call the post method in the api/blog folder under comment
  //create an id variable

  const response = await fetch(`/api/blog/comment/${id}`, {
    method: "DELETE",
  });

  //if the response is okay then reload the page with the blog id
  if (response.ok) {
    document.location.replace(`/`);
  } else {
    alert(response.statusText);
  }
};

//add an event listener to the post comment button
document
  .querySelector(".delete-comment-button-confirm")
  .addEventListener("click", deleteCommentHandler);
