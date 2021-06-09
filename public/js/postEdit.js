const deleteBtn = document.querySelector(".btn-delete");
const deletePost = async () => {
  const id = document.getElementById("post-id").dataset.id;

  const response = await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

deleteBtn.addEventListener("click", deletePost);
