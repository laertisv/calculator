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
    // If we are at the end of a calculation and a digit is pressed, clear the display and start a new calculation. This can be checked by the operator not existing at the end of a previous calculation.
    if (variableA !== "" && operator === "") {
        display.textContent = btn.textContent;
        variableA = "";
    } 
    else {
        // If the operator exists but the second variable is empty, this means that this is the first digit of the second variable. Clear the display to start a new number.
        if (operator !== "" && variableB == "") {
            display.textContent = "";
        };
        if (display.textContent.length < 10) {
            display.textContent += btn.textContent;
        };
        // If the operator exists, this means that we are in the process of obtaining the second variable. We store it every time, to avoid resetting it to empty in the check above.
        if (operator !== "") {
            variableB = display.textContent;
        };  
    };
};

function useOperator(btn) {
    if (display.textContent !== "") {
        variableA = display.textContent;
        operator = btn.textContent;
    };
};

function clearDisplay() {
    display.textContent = "";
    variableA = "";
    variableB = "";
    operator = "";
};

function operateAndDisplay() {
    if (variableA !== "" && variableB !== "" && operator !== "") {
        display.textContent = operate(parseFloat(variableA), parseFloat(variableB), operator);
        variableA = display.textContent;
        variableB = "";
        operator = "";
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