document.addEventListener("DOMContentLoaded", function() {
  const passwordField = document.querySelector("#floatingPassword");
  const passwordConditions = document.querySelectorAll(".password-condition");
  const password2Field = document.querySelector("#floatingPassword2");
  const nextButton = document.querySelector(".nextBtn");
  
  passwordField.addEventListener("input", function() {
    const password = passwordField.value;
    const password2 = password2Field.value;
    let allConditionsMet = true;
    let passwordIsEmpty = false;
    if (password === "") {
      passwordIsEmpty = true;
    }
    passwordConditions.forEach(condition => {
      const nextButton = document.querySelector("#passwdbtn");
      const conditionText = condition.querySelector(".condition-text");
      const conditionIcon = condition.querySelector(".condition-icon");
      const regex = new RegExp(conditionText.dataset.regex);
      if (!regex.test(password) && !passwordIsEmpty) {
        allConditionsMet = false;
        conditionText.style.color = "red";
        conditionIcon.classList.remove("bi-check-circle-fill");
        conditionIcon.classList.add("bi-x-circle-fill");
        nextButton.disabled = true;
        nextButton.style.backgroundColor = "#e0e0e0";
      } else {
        conditionText.style.color = "green";
        conditionIcon.classList.remove("bi-x-circle-fill");
        conditionIcon.classList.add("bi-check-circle-fill");
        nextButton.disabled = false;
        nextButton.style.backgroundColor = "#007bff";
      }
    });
  });
  password2Field.addEventListener("input", function(){
    const password = passwordField.value;
    const password2 = password2Field.value;
    const nextButton = document.querySelector('#passwdbtn');
    let allConditionsMet = true;
    const equalIcon = document.querySelector("#equal-icon");
    const equalityText = document.querySelector("#equality-text");
      if (password === password2 && allConditionsMet) {
        equalIcon.style.color = "green";
        equalityText.style.color = "green"
        equalIcon.classList.remove("bi-x-circle-fill");
        equalIcon.classList.add("bi-check-circle-fill");
        nextButton.disabled = false;
        nextButton.style.backgroundColor = "#007bff";
      } else {
      equalIcon.style.color = "red";
      equalityText.style.color = "red"
      equalIcon.classList.remove("bi-check-circle-fill");
      equalIcon.classList.add("bi-x-circle-fill");
      nextButton.disabled = true;
      nextButton.style.backgroundColor = "#e0e0e0";
    }
  })
});

  