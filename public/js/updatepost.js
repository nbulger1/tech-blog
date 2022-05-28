const updateBlogPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#exampleTitle").value.trim();
  const text = document.querySelector("#exampleBlogText").value.trim();
  const key_phrase = document.querySelector("#exampleKeyPhrase").value.trim();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  //   if (title && text && key_phrase) {
  const response = await fetch(`/api/blog/${id}`, {
    method: "PUT",
    body: JSON.stringify({ blog_id: id, title, text, key_phrase }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to create post");
  }
};

document
  .querySelector(".update-blog-post")
  .addEventListener("submit", updateBlogPostHandler);
