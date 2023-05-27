let equationArray;
let rpnEquationArray;
const outputValue = [];
const operatorStack = [];
const provisoryNumberHolder = [];
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
      changeOperationHistoryValue();
      convertToRPN(mainDisplayValue);
      calculateEquation(rpnEquationArray);
      break;
    case (buttonValue === 'AC'):
      clearAllData();
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

function changeOperationHistoryValue() {
  operationHistoryScreen.textContent = mainDisplayValue;
}

function clearAllData() {
  mainDisplayValue = '';
  operationHistoryValue = '';
  equationArray = '';
  outputValue.length = 0;
  operatorStack.length = 0;
  operationResult = undefined;
  mainDisplayScreen.textContent = 0;
  operationHistoryScreen.textContent = 0;
  toggleOperatorButtonStatus('active');
}

function eraseLastInput() {
  if ((mainDisplayValue.length <= 1) ||
      (mainDisplayValue.endsWith(' ') && mainDisplayValue.length === 2)) {
        mainDisplayValue = '';
        mainDisplayScreen.textContent = 0;
        toggleOperatorButtonStatus('active');
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

function convertToRPN(mainDisplayValue) {
  equationArray = `( ${mainDisplayValue} )`.split(' ');
  equationArray.splice(equationArray.length - 2, 1);

  for (let index of equationArray) {
    if (index === '(') {
      operatorStack.push(index);
    } else if (Number.isInteger(+index)) {
      outputValue.push(index);
    } else if (index === ')') {
      let i = operatorStack.length - 1;
      while (operatorStack[i] !== '(') {
        outputValue.push(operatorStack[i]);
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
        outputValue.push(operatorStack[j]);
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
        outputValue.push(operatorStack[k]);
        operatorStack.pop();
        k--;
      }
      operatorStack.push(index);
    } else {
      let l = operatorStack.length - 1;
      while (operatorStack[l] === '^' || operatorStack[l] === '√') {
        outputValue.push(operatorStack[l]);
        operatorStack.pop();
        l--;
      }
      operatorStack.push(index);
    }
  }
  for (let operator of operatorStack) {
    outputValue.push(operator);
    operatorStack.pop();
  }
  return rpnEquationArray = outputValue;
}

function calculateEquation(equationArray) {
  for (let element of equationArray) {
    if (Number.isInteger(+element)) {
      operatorStack.push(+element);
    } else {
      if (element === '√') {
        operate(element, operatorStack[operatorStack.length - 1]);
        operatorStack.push(operationResult);
        operatorStack.splice(operatorStack.length - 2, 1);
      } else {
        operate(element, operatorStack[operatorStack.length - 2], operatorStack[operatorStack.length - 1]);
        operatorStack.push(operationResult);
        operatorStack.splice(operatorStack.length - 2, 1);
        operatorStack.splice(operatorStack.length - 2, 1);
      } 
    }
  }
  finalResult = operatorStack;
  console.log(finalResult);
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