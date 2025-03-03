function add(a, b) {
  return a + b;
};

function subtract(a, b) {
  return a - b;
};

function multiply(a, b) {
  return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(a, b, operator) {
    switch (operator) {
      case "+":
        return add(a, b);
      case "-":
        return subtract(a, b);
      case "*":
        return multiply(a, b);
      case "/":
        return divide(a, b);
    };
  };

function addDigit(btn) {
    // If the display is showing an error message, clear it.
    if (display.textContent === "Gauss wept\xa0") {
        display.textContent = "0";
    };
    // If we are at the end of a calculation and a digit is pressed, clear the display and start a new calculation. This can be checked by the operator not existing at the end of a previous calculation.
    if (variableA !== "" && operator === "") {
        if (btn.textContent === ".") {
            display.textContent = "0";
        }
        display.textContent = btn.textContent;
        backspace.disabled = false;
        variableA = "";
    } 
    else {
        // If the operator exists but the second variable is empty, this means that this is the first digit of the second variable. Clear the display to start a new number.
        if (operator !== "" && variableB == "") {
            if (btn.textContent === ".") {
                display.textContent = "0.";
                decimal.disabled = true;
            }
            else {
                display.textContent = "0";
            };
        };
        // Otherwise, we are just adding our number to the display (may be the first or second variable). 
        if (display.textContent.length < 10 || (display.textContent.includes(".") && display.textContent.length < 11)) {
            if (btn.textContent === ".") {
                decimal.disabled = true;
                if (display.textContent.includes(".")) {
                    return;
                };
            };
            if (display.textContent === "0" && btn.textContent !== ".") {
                display.textContent = "";
            };
            display.textContent += btn.textContent;
            backspace.disabled = false;
        };
        // If the operator exists, this means that we are in the process of obtaining the second variable. We store it every time, to avoid resetting it to empty in the check above.
        if (operator !== "") {
            variableB = display.textContent;
        };  
    };
};

function useOperator(btn) {
    if (display.textContent !== "" && display.textContent !== "Gauss wept\xa0") {
        variableA = display.textContent;
        operator = btn.textContent;
        decimal.disabled = false;
    };
};

function clearDisplay() {
    display.textContent = "0";
    variableA = "";
    variableB = "";
    operator = "";
    decimal.disabled = false;
    backspace.disabled = false;
};

function operateAndDisplay() {
    if (variableA !== "" && variableB !== "" && operator !== "") {
        if (operator === "/" && variableB === "0") {
            display.textContent = "Gauss wept\xa0";
            variableA = "";
            variableB = "";
            operator = "";
            decimal.disabled = false;
            return;
        };
        answer = operate(parseFloat(variableA), parseFloat(variableB), operator);
        if (Math.floor(answer) > 9999999999) { 
            // 9999999999 is the largest number that can be displayed without scientific notation.
            answer = answer.toExponential(5);
        }
        else if (answer.toString().length > 10 && answer.toString().includes(".")) {
            // Calculate how many decimal places we can keep
            const integerPart = Math.floor(Math.abs(answer));
            const integerLength = integerPart.toString().length;
            const decimalPlaces = 10 - integerLength;
            // Round to the calculated number of decimal places
            const multiplier = Math.pow(10, decimalPlaces);
            answer = Math.round(answer * multiplier) / multiplier;
        };
        display.textContent = answer;
        variableA = display.textContent;
        variableB = "";
        operator = "";
        decimal.disabled = false;
        backspace.disabled = true;
    };
}

function removeDigit() {
    if (display.textContent !== "0" && display.textContent !== "Gauss wept\xa0") {
        if (display.textContent.slice(-1) === ".") {
            decimal.disabled = false;
        };
        display.textContent = display.textContent.slice(0, -1);
    };
};

function simulateClick(button) {
    button.classList.add('clicked');
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 100);
}

let variableA = "", variableB = "", operator = "";

const display = document.querySelector("#display");
display.textContent = "0";

const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#equals");
const clear = document.querySelector("#clear");
const decimal = document.querySelector("#decimal");
const backspace = document.querySelector("#backspace");

digits.forEach(btn => btn.addEventListener("click", () => addDigit(btn)));
operators.forEach(btn => btn.addEventListener("click", () => useOperator(btn)));
equals.addEventListener("click", operateAndDisplay);
clear.addEventListener("click", clearDisplay);
backspace.addEventListener("click", removeDigit);

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "0":
            addDigit(digits[9]);
            simulateClick(digits[9]);
            break;
        case "7":
            addDigit(digits[6]);
            simulateClick(digits[6]);
            break;
        case "8":
            addDigit(digits[7]);
            simulateClick(digits[7]);
            break;
        case "9":
            addDigit(digits[8]);
            simulateClick(digits[8]);
            break;
        case "4":
            addDigit(digits[3]);
            simulateClick(digits[3]);
            break;
        case "5":
            addDigit(digits[4]);
            simulateClick(digits[4]);
            break;
        case "6":
            addDigit(digits[5]);
            simulateClick(digits[5]);
            break;
        case "1":
            addDigit(digits[0]);
            simulateClick(digits[0]);
            break;
        case "2":
            addDigit(digits[1]);
            simulateClick(digits[1]);
            break;
        case "3":
            addDigit(digits[2]);
            simulateClick(digits[2]);
            break;
        case ".":
            addDigit(decimal);
            if (!decimal.disabled) {
                simulateClick(decimal);
            };
            break;
        case "+":
            useOperator(operators[0]);
            simulateClick(operators[0]);
            break;
        case "-":
            useOperator(operators[1]);
            simulateClick(operators[1]);
            break;
        case "*":
            useOperator(operators[2]);
            simulateClick(operators[2]);
            break;
        case "/":
            useOperator(operators[3]);
            simulateClick(operators[3]);
            break;
        case "Enter":
            operateAndDisplay();
            simulateClick(equals);
            break;
        case "Backspace":
            if (!backspace.disabled) {
                removeDigit();
                simulateClick(backspace);
            };
            break;
        case "Escape":
            clearDisplay();
            simulateClick(clear);
            break;
    };
});