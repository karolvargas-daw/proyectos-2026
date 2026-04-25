let current = "0";
let previous = null;
let operator = null;
let resetScreen = false;

const display = document.getElementById("display");

function updateDisplay() {
  display.textContent = current;
}

function appendNumber(number) {
  if (resetScreen) {
    current = number;
    resetScreen = false;
  } else {
    if (current.length >= 8) return;
    current = current === "0" ? number : current + number;
  }
  updateDisplay();
}

function setOperator(op) {
  if (operator !== null) calculate();
  previous = parseFloat(current);
  operator = op;
  resetScreen = true;
}

function calculate() {
  if (operator === null || previous === null) return;

  let result;

  switch (operator) {
    case "+":
      result = previous + parseFloat(current);
      break;
    case "-":
      result = previous - parseFloat(current);
      break;
    case "/":
      if (current === "0") {
        current = "ERR";
        updateDisplay();
        return;
      }
      result = previous / parseFloat(current);
      break;
  }

  if (result.toString().length > 8) {
    current = "ERR";
  } else {
    current = result.toString();
  }

  operator = null;
  previous = null;
  resetScreen = true;

  updateDisplay();
}

function clearEntry() {
  current = "0";
  updateDisplay();
}

function clearAll() {
  current = "0";
  previous = null;
  operator = null;
  updateDisplay();
}