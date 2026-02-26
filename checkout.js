const form = document.getElementById("checkout-form");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  const fields = ["name", "email", "phone", "address", "payment"];

  fields.forEach((fieldId) => {
    const input = document.getElementById(fieldId);
    const error = input.parentElement.querySelector(".error");

    if (!input.value.trim()) {
  error.textContent = "This field is required";
  isValid = false;
    } else if (fieldId === "email") {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(input.value)) {
       error.textContent = "Please enter a valid email address";
      isValid = false;
      } else {
        error.textContent = "";
      }

        } else {
          error.textContent = "";
        }
  });

  if (isValid) {
    successMessage.textContent = "Order successfully placed!";
    form.reset();
  }
});

