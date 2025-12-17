function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b == 0) return NaN;
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return NaN;
  }
}

function calculate(operator, a, b) {
  const ans = operate(operator, a, b);
  display.textContent = ans;
  currentOperation = null;
  num1 = null;
  num2 = null;
  numberAvailable = true;
  justCalculated = true;
  decimalUsed = false;
}

function reset() {
  console.log("hi");
  display.textContent = 0;
  currentOperation = null;
  numberAvailable = true;
  num1 = null;
  num2 = null;
  decimalUsed = false;
  justCalculated = false;
}

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const decimal = document.querySelector(".decimal");

let currentOperation;
let numberAvailable;
let num1;
let num2;
let decimalUsed;
let justCalculated;

reset();

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (justCalculated) {
      reset();
    }
    if (!numberAvailable) {
      display.textContent = "";
    }
    if (display.textContent == "0") {
      display.textContent = e.target.textContent;
    } else {
      display.textContent += e.target.textContent;
    }
    numberAvailable = true;
  });
});

operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!num1) {
      num1 = parseFloat(display.textContent);
    } else if (!num2 && numberAvailable) {
      num2 = parseFloat(display.textContent);
      calculate(currentOperation, num1, num2);
      num1 = parseFloat(display.textContent);
    }

    currentOperation = e.target.textContent;
    numberAvailable = false;
    decimalUsed = false;
    justCalculated = false;
  });
});

equals.addEventListener("click", (e) => {
  if (num1 && currentOperation) {
    if (!num2 && numberAvailable) {
      num2 = parseFloat(display.textContent);
      calculate(currentOperation, num1, num2);
    }
  }
});

decimal.addEventListener("click", (e) => {
  if (numberAvailable && !decimalUsed) {
    display.textContent += ".";
    decimalUsed = true;
  }
});

clear.addEventListener("click", reset);
