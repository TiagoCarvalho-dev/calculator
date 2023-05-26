const inputValue = [];
const outputValue = [];
const operatorStack = [];
let result;
let mainDisplayValue = '';
let operationHistoryValue = '';
const mainDisplayScreen = document.getElementById('mainDisplayScreen');
const operationHistoryScreen = document.getElementById('operationHistoryScreen');

document.querySelectorAll('#calculatorButtons button').forEach(node => {
  node.addEventListener('click', () => handleButtonClicks(node.textContent));
});

function handleButtonClicks(buttonValue) {
  switch (true) {
    case (buttonValue === '='):
    changeOperationHistoryValue()  
    operate();
    changeMainDisplayValue(result);
      break;
    case (buttonValue === 'AC'):
      operationHistoryValue === '' ? clearDisplayStatus() : clearAllData();
      break;
    case (buttonValue === 'C'):
      eraseLastInput();
      break;
    default:
      if (!Number.isInteger(+buttonValue)) {
        changeMainDisplayValue(buttonValue);
      } else {
        changeMainDisplayValue(buttonValue);
      }
  }
}

function changeMainDisplayValue(value) {
  if (Number.isInteger(+value) || value === '.') {
    mainDisplayValue += value;
    mainDisplayScreen.textContent = mainDisplayValue;
  } else {
    if (mainDisplayValue.length === 0 || mainDisplayValue.endsWith(' ')) {
      mainDisplayValue += `${value} `;
      mainDisplayScreen.textContent = mainDisplayValue;
    } else {
      mainDisplayValue += ` ${value} `;
      mainDisplayScreen.textContent = mainDisplayValue;
    }
  }
}

function changeOperationHistoryValue() {
  operationHistoryScreen.textContent = mainDisplayValue;
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
  mainDisplayScreen.textContent = 0;
  operationHistoryScreen.textContent = 0;
  toggleOperatorButtonStatus('active');
}

function eraseLastInput() {
  if ((mainDisplayValue.length <= 1) ||
      (mainDisplayValue.endsWith(' ') && mainDisplayValue.length === 2)) {
        clearDisplayStatus();
  } else if (mainDisplayValue.endsWith(' ')) {
    mainDisplayValue = mainDisplayValue.substring(0, mainDisplayValue.length - 2);
    mainDisplayScreen.textContent = mainDisplayValue;
  } else {
    mainDisplayValue = mainDisplayValue.substring(0, mainDisplayValue.length - 1);
    mainDisplayScreen.textContent = mainDisplayValue;
  }
}

function toggleOperatorButtonStatus(status, buttonValue) {
  if (status === 'active') {
    document.querySelectorAll('#calculatorButtons button').forEach(node => {
      node.disabled = false;
    });
  } else {
    document.getElementById(buttonValue + 'Button').disabled = true;
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
    case '÷':
      division(number1, number2);
      break;
    case '%':
      percentage(number1);
      break;
    case '√':
      squareRoot(number1);
      break;
    case '^':
      power(number1, number2);
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

function percentage(a) {
  return result = a / 100;
}

function squareRoot(a) {
  return result = a ** (1 / 2);
}

function power(a, b) {
  return result = a ** b;
}