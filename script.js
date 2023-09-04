 // Variables
    const form = document.querySelector("form");
    const labels = document.querySelectorAll("label");
    const inputs = document.querySelectorAll("input");
    const emptyError = document.querySelectorAll(".empty-error-message");
    const invalidError = document.querySelectorAll(".invalid-error-message");
    const invalidDateError = document.querySelector(".invalid-date-error-message");
    const submitBtn = document.querySelector(".submit-btn");
    const yearResult = document.querySelector(".YYYY");
    const monthResult = document.querySelector(".MM");
    const dayResult = document.querySelector(".DD");

// Check if empty input
    const emptyInput = (input) => input === "" ;

// Check if valid day
    const validDay = (input) => {

        const day = parseInt(input, 10);
        return !isNaN(day) && day >= 1 && day <= 31;
    }

// Check if valid month
    const validMonth = (input) => {

        const month = parseInt(input, 10);
        return !isNaN(month) && month >= 1 && month <= 12;
    }

// Check if valid year
    const validYear = (input) => {

        const year = parseInt(input, 10);
        const currentYear = new Date().getFullYear();
        return !isNaN(year) && year >= 1900 && year <= currentYear;
    }

// Check if valid date (e.g. February only has 28 days, April has 30 days, etc.)
    const validDate = (day, month, year) => {
        
        const maxDaysInMonth = [
            31, // January
            28, // February (assuming non-leap year)
            31, // March
            30, // April
            31, // May
            30, // June
            31, // July
            31, // August
            30, // September
            31, // October
            30, // November
            31, // December
        ];

        if (month < 1 || month > 12) {
            return false;
        }

        if (day < 1 || day > maxDaysInMonth[month - 1]) {
            return false;
        }

        return true;
    }
    
// Validate form
    function validate(e) {

        e.preventDefault();

        // Form flag
            let isFormValid = true;

        // Check for empty input
            inputs.forEach((input, i) => {
                if (emptyInput(input.value)) {
                    labels[i].style.color = "var(--clr-primary-light-red)";
                    input.style.border = "1px solid var(--clr-primary-light-red)";
                    emptyError[i].classList.remove("hidden");
                    isFormValid = false;
                } else {
                    labels[i].style.color = "var(--clr-neutral-smokey-gray)";
                    input.style.border = "1px solid var(--clr-neutral-light-gray)";
                    emptyError[i].classList.add("hidden");
                }
            });

        // Returns back to start if inputs are empty
            if (!isFormValid) {
                return;
            }

        // Check for valid input
            inputs.forEach((input, i) => {

                const day = i === 0 ? parseInt(input.value, 10) : null;
                const month = i === 1 ? parseInt(input.value, 10) : null;
                const year = i === 2 ? parseInt(input.value, 10) : null;

                if (i === 0 && !validDay(day)) {
                    labels[i].style.color = "var(--clr-primary-light-red)";
                    input.style.border = "1px solid var(--clr-primary-light-red)";
                    invalidError[i].classList.remove("hidden");
                    isFormValid = false;
                } else if (i === 1 && !validMonth(month)) {
                    labels[i].style.color = "var(--clr-primary-light-red)";
                    input.style.border = "1px solid var(--clr-primary-light-red)";
                    invalidError[i].classList.remove("hidden");
                    isFormValid = false;
                } else if (i === 2 && !validYear(year)) {
                    labels[i].style.color = "var(--clr-primary-light-red)";
                    input.style.border = "1px solid var(--clr-primary-light-red)";
                    invalidError[i].classList.remove("hidden");
                    isFormValid = false;
                } else {
                    labels[i].style.color = "var(--clr-neutral-smokey-gray)";
                    input.style.border = "1px solid var(--clr-neutral-light-gray)";
                    invalidError[i].classList.add("hidden");
                }
            });

        // Calculate age from inputted values
            function calculateAge(day, month, year) {

                const currentDate = new Date();
                const birthDate = new Date(year, month - 1, day);
                const ageInMilliseconds = currentDate - birthDate;
                const ageInSeconds = ageInMilliseconds / 1000;
                const ageInMinutes = ageInSeconds / 60;
                const ageInHours = ageInMinutes / 60;
                const ageInDays = ageInHours / 24;
                const ageInMonths = ageInDays / 30.4375;
                const ageInYears = Math.floor(ageInMonths / 12);

                const remainingMonths = Math.floor(ageInMonths % 12);
                const remainingDays = Math.floor(ageInDays % 30.4375);

                return {
                    years: ageInYears,
                    months: remainingMonths,
                    days: remainingDays
                };
            }

        // Check for valid date only if there are no empty fields or invalid inputs
            if (isFormValid) {

                const day = parseInt(inputs[0].value, 10);
                const month = parseInt(inputs[1].value, 10);
                const year = parseInt(inputs[2].value, 10);

                if (!validDate(day, month, year)) {
                    labels[0].style.color = "var(--clr-primary-light-red)";
                    invalidDateError.classList.remove("hidden");
                } else {
                    labels[0].style.color = "var(--clr-neutral-smokey-gray)";
                    invalidDateError.classList.add("hidden");

                    // Change results content
                        const age = calculateAge(day, month, year);

                        yearResult.textContent = age.years;
                        yearResult.style.marginRight = "1rem";

                        monthResult.textContent = age.months;
                        monthResult.style.marginRight = "1rem";

                        dayResult.textContent = age.days;
                        dayResult.style.marginRight = "1rem";
                }
            }
    }  

form.addEventListener("submit", validate);
submitBtn.addEventListener("click", validate);