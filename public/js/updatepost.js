const updateBlogPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#newTitle").value.trim();
  console.log(title);
  const text = document.querySelector("#newBlogText").value.trim();
  const key_phrase = document.querySelector("#newKeyPhrase").value.trim();

  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/blog/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, text, key_phrase }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};

document
  .querySelector(".update-post")
  .addEventListener("submit", updateBlogPostHandler);
