const loginForm = document.querySelector(".login-form");

const loginEvent = async (event) => {
  event.preventDefault();

  const email = document.getElementById("email-input").value.trim();
  const password = document.getElementById("password-input").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
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
