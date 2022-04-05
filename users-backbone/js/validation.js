const notEmpty = /([^\s])/;
const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

function validateName(input, errorField) { 
  return validateInput(input, notEmpty, errorField, "Укажите имя")
}
function validatePhone(input, errorField) {
  const phoneIsNotEmpty = validateInput(input, notEmpty, errorField, "Укажите телефон");
  if (!phoneIsNotEmpty) return false;

  const phoneIsValid = validateInput(input, phoneRegex, errorField, "Неверный формат");
  if (!phoneIsValid) return false;

  return true
}
function validateInput(input, regex, errorField, errorMessage) {
  if (!regex.test(input.value)) {
    errorField.textContent = errorMessage;
    input.style.borderBottom = "2px solid red";
    return false
  }
  else { 
    errorField.textContent = "";
    input.style.borderBottom = "1px solid #000";
    return true
  };
}