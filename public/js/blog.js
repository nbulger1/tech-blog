// const createPostEl = document.querySelector(".create-post");

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

// createPostEl.addEventListener("click", function (event) {
//   alert("ive been clicked");
//   newBlogPostHandler(event);
// });

document
  .querySelector(".create-post")
  .addEventListener("submit", newBlogPostHandler);
