//function to create a new comment
const newCommentHandler = async (event) => {
  event.preventDefault();

  //take the input text value from the exampleComment id
  const comment_text = document.querySelector("#exampleComment").value.trim();

  const blog_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  //if the comment_text is present then call the post method in the api/blog folder under comment
  if (comment_text) {
    const response = await fetch(`/api/blog/comment`, {
      method: "POST",
      body: JSON.stringify({ comment_text, blog_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //if the response is okay then reload the page with the blog id
    if (response.ok) {
      document.location.replace(`/${blog_id}`);
    } else {
      alert("Failed to create post");
    }
  }
};

//add an event listener to the post comment button
document
  .querySelector(".post-comment")
  .addEventListener("submit", newCommentHandler);
