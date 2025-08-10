const userInput = document.getElementById("user-input");
const results = document.getElementById("results-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

const validatePhone = (phone) => {
    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-])?\d{3}([\s-])?\d{4}$/;
    return regex.test(phone);
};
checkBtn.addEventListener("click", () => {
    results.textContent = "";
    const inputValue = userInput.value.trim();
    const number = validatePhone(inputValue);

    if (userInput.value === "") {
        alert("Please provide a phone number");
        return;
    }
    results.textContent = number ? `Valid US number: ${inputValue}`: `Invalid US number: ${inputValue}`;
});
clearBtn.addEventListener("click", () => {
    results.textContent = "";
});
