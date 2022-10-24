'use strict';
const d = document,
  $display = d.getElementById('display'),
  $btns = d.querySelectorAll('.btn');

$display.textContent = '0';

d.addEventListener('DOMContentLoaded', eventListeners);

const showResult = (result) => ($display.textContent = result);

const add = (num1, num2) => num1 + num2;

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => num1 / num2;

const operate = (operator, num1, num2) => {
  if (operator === '+') return add(num1, num2);
  if (operator === '-') return subtract(num1, num2);
  if (operator === '*') return multiply(num1, num2);
  if (operator === '/') return divide(num1, num2);
};

function eventListeners() {
  let operator = null,
    num1 = null,
    num2 = null,
    str = '',
    previousOp = null;

  const reset = () => {
    operator = null;
    num1 = null;
    num2 = null;
    str = '';
    previousOp = null;
  };

  $btns.forEach(($btn) => {
    $btn.addEventListener('click', () => {
      const value = +$btn.value;
      if (isNaN(value)) {
        if ($btn.value === 'reset') {
          reset();
          showResult(0);
        } else {
          previousOp = operator;
          operator = $btn.value;
          if ($btn.value === '=') {
            if (!num1 || !previousOp) return;
            if (!num2) num2 = +$display.textContent;
            showResult(operate(previousOp, num1, num2));
            reset();
          } else {
            if (!num1) {
              num1 = +$display.textContent;
            } else if (!num2) {
              num2 = +$display.textContent;
              str = '';
            } else {
              if (previousOp) num1 = operate(previousOp, num1, num2);
              else num1 = operate(operator, num1, num2);
              num2 = +$display.textContent;
              showResult(operate(operator, num1, num2));
              str = '';
            }
          }
        }
      } else {
        if ($display.textContent === '0') {
          $display.textContent = $btn.value;
        } else if (!num1) {
          $display.textContent += $btn.value;
        } else if (!num2) {
          str += $btn.value;
          $display.textContent = str;
        } else {
          str += $btn.value;
          $display.textContent = str;
        }
      }
    });
  });
}
