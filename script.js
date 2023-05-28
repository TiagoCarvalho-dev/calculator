let equationArray;
let rpnEquationArray;
const numberStack = [];
const operatorStack = [];
const finalResultStack = [];
let operationResult;
let finalResult;
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
      changeMainDisplayValue(buttonValue);
      operationHistoryScreen.textContent = mainDisplayValue;
      convertToRPN(mainDisplayValue);
      calculateEquation(rpnEquationArray);
      finalResultStack.length === 1 ? prepareNextEquation(finalResult): equationNotValid();
      break;
    case (buttonValue === 'AC'):
      clearAllData();
      break;
    case (buttonValue === 'C'):
      eraseLastInput();
      break;
    case (buttonValue === '.'):
      changeMainDisplayValue(buttonValue);
      toggleDotButtonStatus('inactive');
      break;
    default:
      if (Number(+buttonValue) || buttonValue === '0') {
        changeMainDisplayValue(buttonValue);
      } else {
        changeMainDisplayValue(buttonValue);
        toggleDotButtonStatus('active');
      }
  }
}

function changeMainDisplayValue(value) {
  if (Number(+value) || value === '0' || value === '.') {
    mainDisplayValue += value;
    mainDisplayScreen.textContent = mainDisplayValue;
  } else if (value === '-') {  // Makes the '-' turn the number into negative or use '-' into an operator
    if(Number(mainDisplayValue[mainDisplayValue.length - 1]) || mainDisplayValue[mainDisplayValue.length - 1] === '0') {
      mainDisplayValue += ` ${value} `;
      mainDisplayScreen.textContent = mainDisplayValue;
    } else {
      mainDisplayValue += `${value}`;
      mainDisplayScreen.textContent = mainDisplayValue;
    }
  } else if (value === '=') {
    if (mainDisplayValue.endsWith(' ')) {
      mainDisplayValue += `${value}`;
      mainDisplayScreen.textContent = mainDisplayValue;
    } else {
      mainDisplayValue += ` ${value}`;
      mainDisplayScreen.textContent = mainDisplayValue;
    }
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

function prepareNextEquation(finalResultValue) {
  mainDisplayValue = finalResultValue.toString();
  mainDisplayScreen.textContent = mainDisplayValue;
  equationArray = '';
  rpnEquationArray = '';
  numberStack.length = 0;
  operatorStack.length = 0;
  finalResultStack.length = 0;
  toggleDotButtonStatus('active');
}

function equationNotValid() {
  operationHistoryScreen.textContent = '';
  mainDisplayScreen.textContent = 'Not a valid equation';
  setTimeout(clearAllData, 3000);
}

function clearAllData() {
  equationArray = undefined;
  rpnEquationArray = undefined;
  numberStack.length = 0;
  operatorStack.length = 0;
  finalResultStack.length = 0;
  operationResult = undefined;
  finalResult = undefined;
  mainDisplayValue = '';
  operationHistoryValue = '';
  mainDisplayScreen.textContent = 0;
  operationHistoryScreen.textContent = '';
  toggleDotButtonStatus('active');
}

function eraseLastInput() {
  if ((mainDisplayValue.length <= 1) ||
      (mainDisplayValue.endsWith(' ') && mainDisplayValue.length === 2)) {
        mainDisplayValue = '';
        mainDisplayScreen.textContent = 0;
  } else if (mainDisplayValue.endsWith(' ')) {
    mainDisplayValue = mainDisplayValue.substring(0, mainDisplayValue.length - 2);
    mainDisplayScreen.textContent = mainDisplayValue;
  } else {
    mainDisplayValue = mainDisplayValue.substring(0, mainDisplayValue.length - 1);
    mainDisplayScreen.textContent = mainDisplayValue;
  }
}

function toggleDotButtonStatus(status) {
  if (status === 'active') {
    document.getElementById('.Button').disabled = false;
  } else {
    document.getElementById('.Button').disabled = true;
  }
}

function convertToRPN(mainDisplayValue) {

  equationArray = `( ${mainDisplayValue} )`.split(' ');
  
  for (let i = 0; i < equationArray.length; i++) {  // Makes (x)(y) become (x) * (y) and x (y + z) become x * (y + z)
    if (equationArray[i] === '(' && (equationArray[i - 1] === ')' || Number(equationArray[i - 1]) || equationArray[i - 1] === '0')) {
      equationArray.splice(i, 0, 'x');
    }
  }

  equationArray.splice(equationArray.length - 2, 1);  // Removes the '=' from the equation

  for (let index of equationArray) {
    if (index === '(') {
      operatorStack.push(index);
    } else if (Number(+index)) {
      numberStack.push(index);
    } else if (index === ')') {
      let i = operatorStack.length - 1;
      while (operatorStack[i] !== '(') {
        numberStack.push(operatorStack[i]);
        operatorStack.pop();
        i--;
      }
      operatorStack.pop();
    } else if (index === '+' || index === '-') {
      let j = operatorStack.length - 1;
      while (operatorStack[j] === '+' ||
             operatorStack[j] === '-' ||
             operatorStack[j] === 'x' ||
             operatorStack[j] === '÷' ||
             operatorStack[j] === '^' ||
             operatorStack[j] === '√') {
        numberStack.push(operatorStack[j]);
        operatorStack.pop();
        j--;
      }
      operatorStack.push(index);
    } else if (index === 'x' || index === '÷') {
      let k = operatorStack.length - 1;
      while (operatorStack[k] === 'x' ||
             operatorStack[k] === '÷' ||
             operatorStack[k] === '^' ||
             operatorStack[k] === '√') {
        numberStack.push(operatorStack[k]);
        operatorStack.pop();
        k--;
      }
      operatorStack.push(index);
    } else {
      let l = operatorStack.length - 1;
      while (operatorStack[l] === '^' || operatorStack[l] === '√') {
        numberStack.push(operatorStack[l]);
        operatorStack.pop();
        l--;
      }
      operatorStack.push(index);
    }
  }
  for (let operator of operatorStack) {
    numberStack.push(operator);
    operatorStack.pop();
  }
  return rpnEquationArray = numberStack;
}

function calculateEquation(equationArray) {
  for (let element of equationArray) {
    if (Number(+element)) {
      finalResultStack.push(+element);
    } else {
      if (element === '√') {
        operate(element, finalResultStack[finalResultStack.length - 1]);
        finalResultStack.push(operationResult);
        finalResultStack.splice(finalResultStack.length - 2, 1);
      } else {
        operate(element, finalResultStack[finalResultStack.length - 2], finalResultStack[finalResultStack.length - 1]);
        finalResultStack.push(operationResult);
        finalResultStack.splice(finalResultStack.length - 2, 1);
        finalResultStack.splice(finalResultStack.length - 2, 1);
      } 
    }
  }
  return finalResult = finalResultStack[0];
}

function operate(operator, number1, number2) {
  switch (operator) {
    case '+':
      addition(number1, number2);
      return operationResult;
    case '-':
      subtraction(number1, number2);
      return operationResult;
    case 'x':
      multiplication(number1, number2);
      return operationResult;
    case '÷':
      division(number1, number2);
      return operationResult;
    case '√':
      squareRoot(number1);
      return operationResult;
    case '^':
      power(number1, number2);
      return operationResult;
  }
}

function addition(a, b) {
  return operationResult = a + b;
}

function subtraction(a, b) {
  return operationResult = a - b;
}

function multiplication(a, b) {
  return operationResult = a * b;
}

function division(a, b) {
  if (b === 0) return operationResult = undefined;
  return operationResult = a / b;
}

function squareRoot(a) {
  return operationResult = a ** (1 / 2);
}

function power(a, b) {
  return operationResult = a ** b;
}