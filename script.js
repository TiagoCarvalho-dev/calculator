let number1;
let number2;
let operator;
let displayValue = '';
let result = 0;

document.getElementById('zeroButton').addEventListener('click', () => changeDisplayValue(0));
document.getElementById('oneButton').addEventListener('click', () => changeDisplayValue(1));
document.getElementById('twoButton').addEventListener('click', () => changeDisplayValue(2));
document.getElementById('threeButton').addEventListener('click', () => changeDisplayValue(3));
document.getElementById('fourButton').addEventListener('click', () => changeDisplayValue(4));
document.getElementById('fiveButton').addEventListener('click', () => changeDisplayValue(5));
document.getElementById('sixButton').addEventListener('click', () => changeDisplayValue(6));
document.getElementById('sevenButton').addEventListener('click', () => changeDisplayValue(7));
document.getElementById('eightButton').addEventListener('click', () => changeDisplayValue(8));
document.getElementById('nineButton').addEventListener('click', () => changeDisplayValue(9));
document.getElementById('dotButton').addEventListener('click', () => changeDisplayValue('.'));

document.getElementById('addButton').addEventListener('click', () => handleOperatorsEvents('+'));
document.getElementById('subtractButton').addEventListener('click', () => handleOperatorsEvents('-'));
document.getElementById('multiplyButton').addEventListener('click', () => handleOperatorsEvents('*'));
document.getElementById('divideButton').addEventListener('click', () => handleOperatorsEvents('/'));
document.getElementById('percentageButton').addEventListener('click', () => handleOperatorsEvents('%'));
document.getElementById('equalsButton').addEventListener('click', () => calculateResult(operator));

document.getElementById('allClearButton').addEventListener('click', () => clearData('allClear'));
document.getElementById('clearButton').addEventListener('click', () => clearData('clear'));

function handleOperatorsEvents(newOperator) {
  if(number1 === undefined) {
    number1 = +displayValue;
    operator = newOperator;
    displayValue = '';
  } else {
    calculateResult(newOperator);
  }
}

function changeDisplayValue(value) {
  displayValue += value;
  document.getElementById('displayScreen').textContent = displayValue;
}

function calculateResult(operator) {
  number2 = +displayValue;
  operate(operator);
  showResult();
}

function showResult() {
  displayValue = '';
  changeDisplayValue(result);
  displayValue = '';
  number1 = result;
  operator = undefined;
}

function clearData(info) {
  if (info === 'allClear') {
    displayValue = '';
    changeDisplayValue('');
    number1 = undefined;
    number2 = undefined;
    operator = undefined;
    result = 0;
  } else {
    displayValue = '';
    changeDisplayValue('');
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