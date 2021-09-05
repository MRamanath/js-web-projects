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
  return inputs.map((el) => {
    if (el.value.trim() === "") {
      showError(el, `${el.placeholder} is required`);
      return { [el.id]: false };
    } else {
      showSuccess(el);
      return { [el.id]: true };
    }
  });
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

  const requiredFields = checkRequired([
    username,
    email,
    password,
    confirmPassword,
  ]);
  requiredFields.forEach((r) => {
    if (r.username) {
      checkLength(username, 3, 15);
    }
    if (r.password) {
      checkLength(password, 8, 25);
      checkPasswordMatch(password, confirmPassword);
    }
    if (r.email) {
      checkEmail(email);
    }
  });
});
