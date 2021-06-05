const signupForm = document.querySelector(".signup-form");

const createNewUser = async (event) => {
  event.preventDefault();

  const username = document.getElementById("name-input").value.trim();
  const email = document.getElementById("email-input").value.trim();
  const password = document.getElementById("password-input").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

signupForm.addEventListener("submit", createNewUser);
