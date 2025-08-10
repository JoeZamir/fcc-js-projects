const input = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

const isPalindrome = (str) => {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/ig, "");
    const reversed = cleaned.split("").reverse().join("");
    return cleaned === reversed;
};
checkBtn.addEventListener("click", () => {
    const text = input.value;

    if (text === "") {
        alert("Please input a value");
        return;
    }
    const isPal = isPalindrome(text);
    result.textContent = isPal ? `${text} is a palindrome` : `${text} is not a palindrome`;
});
