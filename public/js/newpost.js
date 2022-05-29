//function to handle creating a new post
const newBlogPostHandler = async (event) => {
  event.preventDefault();

  // gather the information from the new post form
  const title = document.querySelector("#exampleTitle").value.trim();
  const text = document.querySelector("#exampleBlogText").value.trim();
  const key_phrase = document.querySelector("#exampleKeyPhrase").value.trim();

  //if all are present then call the api/blog/newpost post method
  if (title && text && key_phrase) {
    const response = await fetch(`/api/blog/newpost`, {
      method: "POST",
      body: JSON.stringify({ title, text, key_phrase }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //if the response is okay then return to the dashboard
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};

document
  .querySelector(".new-blog-post")
  .addEventListener("submit", newBlogPostHandler);
