document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('stepByStepForm');
    const steps = form.querySelectorAll('.step');
    const prevBtns = form.querySelectorAll('.prevBtn');
    const nextBtns = form.querySelectorAll('.nextBtn');
    const submitBtn = form.querySelector('input[type="submit"]');
    const alertUses = document.querySelectorAll('.alert-use');

    let currentStep = 0;

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.style.display = index === stepIndex ? 'block' : 'none';
        });

        alertUses.forEach((alertUse, index) => {
            alertUse.style.display = index === stepIndex ? 'block' : 'none';
        });

        if (stepIndex === 0) {
            prevBtns[0].style.display = 'none';
        } else {
            prevBtns[0].style.display = 'inline-block';
        }

        if (stepIndex === steps.length - 1) {
            nextBtns.forEach(nextBtn => {
                nextBtn.style.display = 'none';
            });
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtns.forEach(nextBtn => {
                nextBtn.style.display = 'inline-block';
            });
            submitBtn.style.display = 'none';
        }

        updateNextButtonStatus(stepIndex);
    }

    function updateNextButtonStatus(stepIndex) {
        const nameErrors = steps[stepIndex].querySelectorAll(".name-error-msg");
        const emailErrors = steps[stepIndex].querySelectorAll(".email-error-msg");

        if (isStepValid(stepIndex) && nameErrors.length === 0 && emailErrors.length === 0) {
            nextBtns.forEach(nextBtn => {
                nextBtn.disabled = false;
                nextBtn.style.backgroundColor = "#007bff";
            });
        } else {
            nextBtns.forEach(nextBtn => {
                nextBtn.disabled = true;
                nextBtn.style.backgroundColor = "#e0e0e0";
            });
        }
    }

    nextBtns.forEach((nextBtn, index) => {
        nextBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const inputFields = steps[currentStep].querySelectorAll('input, select');
            let isValid = true;

            inputFields.forEach(inputField => {
                if (!inputField.checkValidity()) {
                    inputField.reportValidity();
                    isValid = false;
                }
            });

            if (isValid) {
                currentStep = Math.min(currentStep + 1, steps.length - 1);
                showStep(currentStep);
            }
        });
    });

    prevBtns.forEach((prevBtn, index) => {
        prevBtn.addEventListener('click', (event) => {
            event.preventDefault();
            currentStep = Math.max(currentStep - 1, 0);
            showStep(currentStep);
        });
    });

    function isStepValid(stepIndex) {
        return true;
    }

    showStep(currentStep);
});
