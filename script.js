let number1;
let number2;
let operator;
let displayValue = '';
let result = 0;

document.getElementById('oneButton').addEventListener('click', () => changeDisplayValue(1));
document.getElementById('twoButton').addEventListener('click', () => changeDisplayValue(2));
document.getElementById('addButton').addEventListener('click', () => handleOperatorsEvents('+'));
document.getElementById('equalsButton').addEventListener('click', () => displayResult('='));

function handleOperatorsEvents(newOperator) {
  if(number1 === undefined) {
    number1 = +displayValue;
    operator = newOperator;
    displayValue = '';
  } else {
    number2 = +displayValue;
    operate(newOperator);
    displayValue = '';
    showResult();
  }
}

function changeDisplayValue(value) {
  displayValue += value;
  document.getElementById('displayScreen').textContent = displayValue;
}

function showResult() {
  changeDisplayValue(result);
  displayValue = '';
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
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  return a / b;
}

function percentage(a, b) {
  return a + (a * b) / 100;
}