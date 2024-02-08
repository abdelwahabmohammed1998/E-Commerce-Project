import { displayHome } from "./routes.js";
const firstNameRegex = /^[A-Za-z]{4,12}$/;
const lastNameRegex = /^[A-Za-z]{4,12}$/;
const emailRegex = /^[A-Za-z_.\-]+@(yahoo|gmail|hotmail|outlook)\.(com)$/;
const phoneRegex = /^(002)?01[0125][0-9]{8}$/;
const subjectRegex = /^[a-zA-Z0-9\s.,!?]{8,}$/;
const messageRegex = /^.{21,}$/;

let firstNameInput = document.getElementById("first-name-input");
let lastNameInput = document.getElementById("last-name-input");
let emailInput = document.getElementById("email-input");
let phoneInput = document.getElementById("phone-input");
let subjectInput = document.getElementById("subject-input");
let messageInput = document.getElementById("message-input");
let submitBtn = document.getElementById("submitButton");
let alert = document.querySelector(".alert");

let firstNameWarning = document.getElementById("first-name-warning");
let lastNameWarning = document.getElementById("last-name-warning");
let emailWarning = document.getElementById("email-warning");
let phoneWarning = document.getElementById("phone-warning");
let subjectWarning = document.getElementById("subject-warning");
let messageWarning = document.getElementById("message-warning");

export function validateFirstName() {
  if (!firstNameRegex.test(firstNameInput.value)) {
    firstNameWarning.style.display = "inline";
    return false;
  } else {
    firstNameWarning.style.display = "none";
    return true;
  }
}
export function validateLastName() {
  if (!lastNameRegex.test(lastNameInput.value)) {
    lastNameWarning.style.display = "inline";
    return false;
  } else {
    lastNameWarning.style.display = "none";
    return true;
  }
}
export function validateEmail() {
  if (!emailRegex.test(emailInput.value)) {
    emailWarning.style.display = "inline";
    return false;
  } else {
    emailWarning.style.display = "none";
    return true;
  }
}
export function validatePhone() {
  if (!phoneRegex.test(phoneInput.value)) {
    phoneWarning.style.display = "inline";
    return false;
  } else {
    phoneWarning.style.display = "none";
    return true;
  }
}
export function validateSubject() {
  if (!subjectRegex.test(subjectInput.value)) {
    subjectWarning.style.display = "inline";
    return false;
  } else {
    subjectWarning.style.display = "none";
    return true;
  }
}
export function validateMessage() {
  if (!messageRegex.test(messageInput.value)) {
    messageWarning.style.display = "inline";
    return false;
  } else {
    messageWarning.style.display = "none";
    return true;
  }
}

firstNameInput.addEventListener("focusout", () => {
  validateFirstName();
  toggleSubmitButton();
});
lastNameInput.addEventListener("focusout", () => {
  validateLastName();
  toggleSubmitButton();
});
emailInput.addEventListener("focusout", () => {
  validateEmail();
  toggleSubmitButton();
});
phoneInput.addEventListener("focusout", () => {
  validatePhone();
  toggleSubmitButton();
});
subjectInput.addEventListener("focusout", () => {
  validateSubject();
  toggleSubmitButton();
});
messageInput.addEventListener("focusout", () => {
  validateMessage();
  toggleSubmitButton();
});

export function validateForm() {
  return (
    validateFirstName() &&
    validateLastName() &&
    validateEmail() &&
    validatePhone() &&
    validateSubject() &&
    validateMessage()
  );
}

function toggleSubmitButton() {
  submitBtn.disabled = !validateForm();
}
submitBtn.addEventListener("click", () => {
  if (validateForm()) {
    alert.style.display = "block";
    setTimeout(() => {
      alert.style.display = "none";
      displayHome()
    }, 3000);
  }
});