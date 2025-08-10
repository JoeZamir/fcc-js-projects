const input = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const romanMap = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
	100: "C",
	90: "XC",
	50: "L",
	40: "XL",
	10: "X",
	9: "IX",
	5: "V",
	4: "IV",
	1: "I"
};

const convertToRoman = (num) => {
    let result = "";
    const keys = Object.keys(romanMap).map(Number).sort((a, b) => b - a);

    for (const key of keys) {
        while (num >= key) {
            result += romanMap[key];
            num -= key;
        }
    }
    return result;
}
convertBtn.addEventListener("click", () => {
    output.textContent = "";
    const number = parseInt(input.value.trim());

    if (isNaN(number)) {
        output.textContent = "Please enter a valid number";
        return;
    } else if (number <= 0) {
        output.textContent = "Please enter a number greater than or equal to 1";
        return;
    } else if (number >= 4000) {
        output.textContent = "Please enter a number less than or equal to 3999";
        return;
    }

    const roman = convertToRoman(number);
    output.textContent = roman;
});
