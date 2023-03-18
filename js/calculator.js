import { CONSTANTS, ERRORS, KEYS, OPERATORS } from "./consts/CONSTANTS.js";

let displayValue = CONSTANTS.stringZero;
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

const mainDisplay = document.querySelector(".display");
const actionDisplay = document.querySelector(".action-display");
const digits = document.querySelectorAll(".digit");
const decimal = document.querySelector(".decimal");
const clear = document.querySelector(".clear");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const backspace = document.querySelector(".backspace");
const clearAll = document.querySelector(".clear");

function updateDisplay() {
    mainDisplay.value = displayValue ?? 0;
    mainDisplay["innerHTML"] = displayValue ?? 0;
}

const updateActionDisplay = (operator) => {
    actionDisplay["innerText"] = operator?.value ?? "";
};

updateDisplay();

function inputDigit(digit) {
    if (waitingForSecondOperand === true) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else if (displayValue.length < 16){
        displayValue = displayValue === CONSTANTS.stringZero ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
}

function clearDisplay() {
    displayValue = CONSTANTS.stringZero;
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);
    let result;

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        updateActionDisplay(operator);
        return;
    }

    if (firstOperand == null) {
        firstOperand = inputValue;
    } else if (operator) {
        result = operate(operator, firstOperand, inputValue);
        displayValue = String(result);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateActionDisplay(operator);
}

function operate(operator, num1, num2) {
    switch (operator) {
        case OPERATORS.Plus:
            return num1 + num2;
        case OPERATORS.Minus:
            return num1 - num2;
        case OPERATORS.Multiply:
            return num1 * num2;
        case OPERATORS.Divide:
            if (num2 === 0) {
                return ERRORS.DivideByZero;
            }
            return num1 / num2;
        default:
            return num2;
    }
}

digits.forEach((digit) => {
    digit.addEventListener('click', (event) => {
        inputDigit(event.target.value);
        updateDisplay();
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', (event) => {
        handleOperator(event.target.value);
        updateDisplay();
        updateActionDisplay(operator)
    });
});

decimal.addEventListener('click', (event) => {
    inputDecimal(event.target.value);
    updateDisplay();
});

clear.addEventListener('click', () => {
    clearDisplay();
});

const count = () => {
    let result;
    updateActionDisplay('')

    if (operator && !waitingForSecondOperand) {
        result = operate(operator, firstOperand, parseFloat(displayValue));
        displayValue = String(result);
        updateDisplay();
        firstOperand = result;
        operator = null;
    }

    displayValue = CONSTANTS.stringZero;
    firstOperand = null;
    operator = null;

    waitingForSecondOperand = true;
}

const callBackspace = () => {
    displayValue = displayValue.slice(0, -1);
    firstOperand =  +displayValue;
    updateDisplay();
}
equals.addEventListener('click', count);

backspace.addEventListener('click', callBackspace);

clearAll.addEventListener('click', () => {
    displayValue = '';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
    updateActionDisplay()
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (KEYS.Digits.test(key)) {
        inputDigit(key);
        updateDisplay();
    } else if (key === '.') {
        inputDecimal(key);
        updateDisplay();
    } else if (KEYS.Operators.test(key)) {
        console.log(key)
        updateActionDisplay({value:key})
        handleOperator(key);
        updateDisplay();
    } else if (key === KEYS.Enter) {
        count()
    } else if (key === KEYS.Backspace) {
        callBackspace()
    }
});
