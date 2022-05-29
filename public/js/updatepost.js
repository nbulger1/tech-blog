//function to handle updating the post
const updateBlogPostHandler = async (event) => {
  event.preventDefault();

  //gather the information from the update form
  const title = document.querySelector("#newTitle").value.trim();
  console.log(title);
  const text = document.querySelector("#newBlogText").value.trim();
  const key_phrase = document.querySelector("#newKeyPhrase").value.trim();

  //if the data id is present then grab that attribute and call the api/blog/id put method
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

    //if the response is alright then return to the dashboard
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};

document
  .querySelector(".update-post")
  .addEventListener("click", updateBlogPostHandler);
