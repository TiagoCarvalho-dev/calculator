let number1;
let number2;
let operator;
let displayValue = '';
let result = 0;

// FIXES:
// FIX %, /, X, = AND . BUTTONS

document.querySelectorAll('#calculatorButtons button').forEach((node) => {
  node.addEventListener('click', () => handleButtonClicks(node.textContent));
});

function changeDisplayValue(value) {
  displayValue += value;
  document.getElementById('displayScreen').textContent = displayValue;
}

function handleButtonClicks(newOperator) {
  
  
  if(number1 === undefined) {
    number1 = +displayValue;
    operator = newOperator;
    displayValue = '';
  } else {
    calculateResult(newOperator);
  }
}

function calculateResult(operator) {
  number2 = +displayValue;
  operate(operator);
  showResult(result);
}

function showResult(result) {
  displayValue = '';
  changeDisplayValue(result);
  displayValue = '';
  number1 = result;
  number2 = undefined;
  operator = undefined;
}

function clearData(info) {
  if (info === 'allClear') {
    displayValue = '';
    document.getElementById('displayScreen').textContent = 0;
    number1 = undefined;
    number2 = undefined;
    operator = undefined;
    result = 0;
  } else {
    displayValue = '';
    document.getElementById('displayScreen').textContent = 0;
  }
}

function operate(operator) {
  switch (operator) {
    case '+':
      addition(number1, number2);
      break;
    case '-':
      subtraction(number1, number2);
      break;
    case 'x':
      multiplication(number1, number2);
      break;
    case '/':
      division(number1, number2);
      break;
    case '%':
      percentage(number1, number2);
      break;
    case '=':
      calculateResult(operator);
      break;
  }
}

function addition(a, b) {
  return result = a + b;
}

function subtraction(a, b) {
  return result = a - b;
}

function multiplication(a, b) {
  return result = a * b;
}

function division(a, b) {
  return result = a / b;
}

function percentage(a, b) {
  return result = a + (a * b) / 100;
}