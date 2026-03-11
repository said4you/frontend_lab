const form = document.getElementById("register-form");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  let valid = true;

  // clear previous errors
  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  if (!name.value.trim()) {
    name.nextElementSibling.textContent = "Name is required";
    valid = false;
  }

  if (!email.value.trim()) {
    email.nextElementSibling.textContent = "Email is required";
    valid = false;
  }

  if (!password.value.trim()) {
    password.nextElementSibling.textContent = "Password is required";
    valid = false;
  }

  if (password.value !== confirmPassword.value) {
    confirmPassword.nextElementSibling.textContent = "Passwords do not match";
    valid = false;
  }

  if (valid) {
    successMessage.textContent = "Registration successful!";
    form.reset();
  }
});
