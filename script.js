const inputValue = [];
const outputValue = [];
const operatorStack = [];
let result;
let mainDisplayValue = '';
let operationHistoryValue = '';

document.querySelectorAll('#calculatorButtons button').forEach(node => {
  node.addEventListener('click', () => handleButtonClicks(node.textContent));
});

function handleButtonClicks(buttonValue) {
  switch (true) {
    case (buttonValue === '='):
      operate();
      break;
    case (buttonValue === 'CE'):
      operationHistoryValue === '' ? clearDisplayStatus() : clearAllData();
      break;
    default:
      if (buttonValue === '.') {
        changeDisplayValue(buttonValue);
        toggleDotButtonStatus('inactive');
      } else {
        changeDisplayValue(buttonValue);
      }
  }
}

function changeDisplayValue(value) {
  mainDisplayValue += value;
  document.getElementById('mainDisplayScreen').textContent = mainDisplayValue;
}

function clearAllData() {
  clearDisplayStatus();
  inputValue = [];
  outputValue = [];
  operatorStack = [];
  result = undefined;
}

function clearDisplayStatus() {
  mainDisplayValue = '';
  operationHistoryValue = '';
  document.getElementById('mainDisplayScreen').textContent = 0;
  document.getElementById('operationHistoryScreen').textContent = 0;
  toggleDotButtonStatus('active');
}

function toggleDotButtonStatus(status) {
  status === 'active' ? document.getElementById('dotButton').disabled = false
                      : document.getElementById('dotButton').disabled = true;
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
    case '÷':
      division(number1, number2);
      break;
    case '%':
      percentage(number1, number2, operator1);
      break;
    case '√':
      squareRoot(number1);
      break;
    case '^':
      power(number1, number2);
      break;
    case 'log':
      logarithm(number1);
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
  if (b === 0) return result = undefined;
  return result = a / b;
}

function percentage(a, b, operator) {
  if (operator === '+') return result = a + (a * b) / 100;
  if (operator === '-') return result = a - (a * b) / 100;
  if (operator === 'x') return result = a * (a * b) / 100;
  if (operator === '÷') return result = a / (a * b) / 100;
}

function squareRoot(a) {
  return result = Math.sqrt(a);
}

function power(a, b) {
  return result = Math.pow(a, b);
}

function logarithm(a) {
  return result = Math.log(a);
}