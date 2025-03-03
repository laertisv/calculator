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
        display.textContent = "";
    };
    // If we are at the end of a calculation and a digit is pressed, clear the display and start a new calculation. This can be checked by the operator not existing at the end of a previous calculation.
    if (variableA !== "" && operator === "") {
        if (btn.textContent === ".") {
            display.textContent = "0";
        }
        display.textContent += btn.textContent;
        variableA = "";
    } 
    else {
        // If the operator exists but the second variable is empty, this means that this is the first digit of the second variable. Clear the display to start a new number.
        if (operator !== "" && variableB == "") {
            if (btn.textContent === ".") {
                display.textContent = "0";
            }
            else {
                display.textContent = "";
            };
        };
        if (display.textContent.length < 10 || (display.textContent.includes(".") && display.textContent.length < 11)) {
            if (btn.textContent === "." && display.textContent == "") {
                display.textContent = "0";
            }
            display.textContent += btn.textContent;
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
    display.textContent = "";
    variableA = "";
    variableB = "";
    operator = "";
    decimal.disabled = false;
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
        if (Math.floor(answer) > 999999999) {
            answer = answer.toExponential(5);
        }
        else if (answer.toString().length > 10 && answer.toString().includes(".")) {
            answer = Math.round(answer * 1000000000) / 1000000000;
        }
        display.textContent = answer;
        variableA = display.textContent;
        variableB = "";
        operator = "";
        decimal.disabled = false;
    };
}

let variableA = "", variableB = "", operator = "";


const display = document.querySelector("#display");
display.textContent = "";

const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#equals");
const clear = document.querySelector("#clear");

digits.forEach(btn => btn.addEventListener("click", () => addDigit(btn)));
operators.forEach(btn => btn.addEventListener("click", () => useOperator(btn)));
equals.addEventListener("click", operateAndDisplay);
clear.addEventListener("click", clearDisplay);