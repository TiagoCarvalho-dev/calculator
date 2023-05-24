let number1;
let number2;
let operator;
let displayValue = '';
let result = 0;

// FIXES:
// FIX %, /, X, = AND . BUTTONS

document.querySelectorAll('#calculatorButtons button').forEach(node => {
  node.addEventListener('click', () => handleButtonClicks(node.textContent));
});

function handleButtonClicks(buttonValue) {
  switch (true) {
    case (Number.isInteger(+buttonValue) || buttonValue === '.'):
      changeDisplayValue(buttonValue);
      break;
    case (buttonValue === 'AC' || buttonValue === 'C'):
      buttonValue === 'AC' ? clearAllData() : clearDisplayStatus();
      break;
    case (buttonValue === '='):
      calculateResult(operator);
      break;
    default:
      if(number1 === undefined) {
        number1 = +displayValue;
        operator = buttonValue;
        displayValue = '';
      } else if (!number1 === undefined && !operator === undefined) {
        number2 = number1;
        console.log(number1, number2, operator, result);
        calculateResult(buttonValue);
      } else {
        console.log(number1, number2, operator, result);
        calculateResult(buttonValue);
      }
      break;
  }
}

function changeDisplayValue(value) {
  displayValue += value;
  document.getElementById('displayScreen').textContent = displayValue;
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

function clearAllData() {
    clearDisplayStatus();
    number1 = undefined;
    number2 = undefined;
    operator = undefined;
    result = 0;
}

function clearDisplayStatus() {
  displayValue = '';
  document.getElementById('displayScreen').textContent = 0;
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