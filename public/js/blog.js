const newBlogPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#exampleTitle").value.trim();
  const text = document.querySelector("#exampleBlogText").value.trim();
  const key_phrase = document.querySelector("#exampleKeyPhrase").value.trim();

  if (title && text && key_phrase) {
    const response = await fetch(`/api/blog`, {
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

// const blogCommentEventHandler = async (event) => {
//   event.preventDefault();

//   const card = document.querySelector(".card");

//   if (card) {
//     // Send a POST request to the API endpoint
//     const response = await fetch("/:id", {
//       method: "GET",
//       //   body: JSON.stringify({ email, password }),
//       //   headers: { "Content-Type": "application/json" },
//     });

//     if (response.ok) {
//       // If successful, redirect the browser to the profile page
//       //   document.location.replace("/comment");
//       console.log("alright");
//     } else {
//       alert(response.statusText);
//     }
//   }
// };

document
  .querySelector(".create-post")
  .addEventListener("submit", newBlogPostHandler);

// document.addEventListener("submit", blogCommentEventHandler);
