//function to handle logging out
const logout = async () => {
  //call the api/users/logout post method to handle the log out
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  //if the response is okay then console log alright
  if (response.ok) {
    console.log("alright");
  } else {
    alert(response.statusText);
  }
};

//add event listener
document.querySelector("#logout").addEventListener("click", logout);
