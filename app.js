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

function processNumber(num) {
  if (justCalculated) {
    reset();
  }
  if (!numberAvailable) {
    display.textContent = "";
  }
  if (display.textContent == "0") {
    display.textContent = num;
  } else {
    display.textContent += num;
  }
  numberAvailable = true;
}

function processOperation(operation) {
  if (!num1) {
    num1 = parseFloat(display.textContent);
  } else if (!num2 && numberAvailable) {
    num2 = parseFloat(display.textContent);
    calculate(currentOperation, num1, num2);
    num1 = parseFloat(display.textContent);
  }

  currentOperation = operation;
  numberAvailable = false;
  decimalUsed = false;
  justCalculated = false;
}

function processEquals() {
  if (num1 && currentOperation) {
    if (!num2 && numberAvailable) {
      num2 = parseFloat(display.textContent);
      calculate(currentOperation, num1, num2);
    }
  }
}

function processDelete() {
  if (!justCalculated && numberAvailable) {
    if (display.textContent.length === 1) {
      display.textContent = 0;
    } else {
      display.textContent = display.textContent.substring(
        0,
        display.textContent.length - 1
      );
    }
  }
}

function reset() {
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
const del = document.querySelector(".del");

let currentOperation;
let numberAvailable;
let num1;
let num2;
let decimalUsed;
let justCalculated;

reset();

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  let nums = "0123456789";
  let operations = "+-*/";
  if (nums.indexOf(e.key) != -1) {
    processNumber(e.key);
  } else if (operations.indexOf(e.key) != -1) {
    processOperation(e.key);
  } else if (e.key === "=" || e.key === "Enter") {
    processEquals();
  } else if (e.key === "Backspace") {
    processDelete();
  }
});

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    processNumber(e.target.textContent);
  });
});

operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    processOperation(e.target.textContent);
  });
});

equals.addEventListener("click", processEquals);

decimal.addEventListener("click", (e) => {
  if (numberAvailable && !decimalUsed) {
    display.textContent += ".";
    decimalUsed = true;
  }
});

del.addEventListener("click", processDelete);

clear.addEventListener("click", reset);
