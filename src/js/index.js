'use strict';
const d = document,
  $display = d.getElementById('display'),
  $btns = d.querySelectorAll('.btn');

$display.textContent = '0';

d.addEventListener('DOMContentLoaded', eventListeners);

function eventListeners() {
  let operator = null,
    num1 = null,
    num2 = null,
    result = null,
    previousOp = null,
    strAux = '';

  const resetVars = (display = '0') => {
    $display.textContent = display;
    operator = null;
    num1 = null;
    num2 = null;
    result = null;
    previousOp = null;
    strAux = '';
  };

  $btns.forEach(($btn) => {
    $btn.addEventListener('click', () => {
      const value = +$btn.value;
      if (isNaN(value)) {
        if ($btn.value === 'reset') resetVars();
        else {
          previousOp = operator;
          operator = $btn.value;
          if ($btn.value === '=') {
            if (!num1 || !previousOp) return;
            else {
              if (!num2) num2 = +$display.textContent;
              result = operate(previousOp, num1, num2);
              resetVars(result);
            }
          } else if (!num1) {
            num1 = +$display.textContent;
          } else if (!num2) {
            num2 = +$display.textContent;
            if (previousOp) result = operate(previousOp, num1, num2);
            else result = operate(operator, num1, num2);
            $display.textContent = result;
          } else {
            if (previousOp) {
              result = operate(previousOp, num1, num2);
              num1 = result;
            }
            num2 = +$display.textContent;
            result = operate(operator, num1, num2);
            $display.textContent = result;
            strAux = '';
          }
        }
      } else {
        if ($display.textContent === '0') {
          $display.textContent = $btn.value;
        } else if (!num1) {
          $display.textContent += $btn.value;
        } else if (!num2) {
          strAux += $btn.value;
          $display.textContent = strAux;
        } else {
          strAux += $btn.value;
          $display.textContent = strAux;
        }
      }
    });
  });
}

function operate(operator, num1, num2) {
  console.log('operate :>> ', num1, operator, num2);
  let result = null;
  if (operator === '+') result = add(num1, num2);
  if (operator === '-') result = subtract(num1, num2);
  if (operator === '*') result = multiply(num1, num2);
  if (operator === '/') result = divide(num1, num2);
  return result;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}
