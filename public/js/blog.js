const newBlogPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#exampleTitle").value.trim();
  const text = document.querySelector("#exampleBlogText").value.trim();
  const key_phrase = document.querySelector("#exampleKeyPhrase").value.trim();

  if (title && text && key_phrase) {
    const response = await fetch(`/api/blog/newpost`, {
      method: "POST",
      body: JSON.stringify({ title, text, key_phrase }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};

const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector("#exampleComment").value.trim();

  if (comment_text) {
    const response = await fetch(`/api/blog/comment`, {
      method: "POST",
      body: JSON.stringify({ comment_text }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/:id");
    } else {
      alert("Failed to create post");
    }
  }
};

document
  .querySelector(".new-blog-post")
  .addEventListener("submit", newBlogPostHandler);

document
  .querySelector(".new-comment")
  .addEventListener("submit", newCommentHandler);
