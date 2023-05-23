let number1;
let number2;
let operator;

function operate(number1, number2, operator) {
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
  return a + b;
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