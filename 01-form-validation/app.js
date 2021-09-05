const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

function showError(input, message) {
  input.classList.add("is-invalid");
  const invalidFeedback = input.nextElementSibling;
  invalidFeedback.innerText = message;
}

function showSuccess(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
}

function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(String(input.value).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, "Email is invalid");
  }
}

function checkRequired(inputs) {
  let isRequired = false;
  inputs.forEach((el) => {
    if (el.value.trim() === "") {
      showError(el, `${el.placeholder} is required`);
      isRequired = true;
    } else {
      showSuccess(el);
    }
  });
  return isRequired;
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${input.placeholder} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(
      input,
      `${input.placeholder} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(
      input2,
      `${input1.placeholder} and ${input2.placeholder} do not match`
    );
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!checkRequired([username, email, password, confirmPassword])) {
    checkLength(username, 3, 15);
    checkLength(password, 8, 25);
    checkEmail(email);
    checkPasswordMatch(password, confirmPassword);
  }
});
