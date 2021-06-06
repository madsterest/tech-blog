const formEl = document.querySelector(".new-post");

const newPost = async (event) => {
  event.preventDefault();

  const title = document.getElementById("post-title").value.trim();

  const description = document.getElementById("post-description").value.trim();

  if (title && description) {
    const response = await fetch("/api/post/", {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

formEl.addEventListener("submit", newPost);
