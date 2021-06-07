const loginForm = document.querySelector(".login-form");

const loginEvent = async (event) => {
  event.preventDefault();

  const password = document.getElementById("password-input").value.trim();
  const username = document.getElementById("username-input").value.trim();

  if (password && username) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ password, username }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

loginForm.addEventListener("submit", loginEvent);
