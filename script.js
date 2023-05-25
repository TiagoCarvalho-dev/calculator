let number1;
let number2;
let operator1;
let operator2;
let displayValue = '';
let result;

document.querySelectorAll('#calculatorButtons button').forEach(node => {
  node.addEventListener('click', () => handleButtonClicks(node.textContent));
});

function handleButtonClicks(buttonValue) {
  switch (true) {
    case (Number.isInteger(+buttonValue)):
      changeDisplayValue(buttonValue);
      break;
    case (buttonValue === '.'):
      changeDisplayValue(buttonValue);
      toggleDotButtonStatus('inactive');
      break;
    case (buttonValue === 'AC' || buttonValue === 'C'):
      buttonValue === 'AC' ? clearAllData() : clearDisplayStatus();
      break;
    case (buttonValue === '%'):
      changeNumbersValue('number2', buttonValue);  
      calculateResult(operator2);
      break;
    case (buttonValue === '='):
      if (number1 === undefined) break;
      changeNumbersValue('number2', buttonValue);
      calculateResult(operator1);
      break;
    default:
      if (number1 === undefined) {
        changeNumbersValue('number1', buttonValue);
      } else {
        changeNumbersValue('number2', buttonValue);
        calculateResult(operator1);
      }
      break;
  }
}

function changeNumbersValue(numberToBeChanged, buttonValue) {
  if (numberToBeChanged === 'number1') {
    number1 = +displayValue;
    operator1 = buttonValue;
    displayValue = '';
  } else {
    number2 = +displayValue;
    operator2 = buttonValue;
    displayValue = '';
  }
  toggleDotButtonStatus('active');
}

function changeDisplayValue(value) {
  displayValue += value;
  document.getElementById('displayScreen').textContent = displayValue;
}

function calculateResult(operator) {
  operate(operator);
  showResult(result);
}

function showResult(result) {
  displayValue = '';
  changeDisplayValue(result);
  displayValue = '';
  number1 = result;
  number2 = undefined;
  operator1 = operator2;
}

function clearAllData() {
  clearDisplayStatus();
  number1 = undefined;
  number2 = undefined;
  operator1 = undefined;
  result = 0;
  toggleDotButtonStatus('active');
}

function clearDisplayStatus() {
  displayValue = '';
  document.getElementById('displayScreen').textContent = 0;
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