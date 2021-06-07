const form = document.querySelector(".comment");

const addComment = async (event) => {
  event.preventDefault();

  const comment = document.getElementById("comment-description").value.trim();
  const id = document.getElementById("post-id").dataset.id;

  if (comment && id) {
    const response = await fetch(`/api/post/${id}/comment`, {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      alert(response.statusText);
    }
  }
};

form.addEventListener("submit", addComment);
