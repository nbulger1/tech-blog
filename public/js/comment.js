const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector("#exampleComment").value.trim();
  console.log(comment_text);

  const blog_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (comment_text) {
    const response = await fetch(`/api/blog/comment`, {
      method: "POST",
      body: JSON.stringify({ comment_text, blog_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/${blog_id}`);
    } else {
      alert("Failed to create post");
    }
  }
};

document
  .querySelector(".post-comment")
  .addEventListener("submit", newCommentHandler);
