let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

const mainDisplay = document.querySelector('.display');
const actionDisplay = document.querySelector('.action-display');
const digits = document.querySelectorAll('.digit');
const decimal = document.querySelector('.decimal');
const clear = document.querySelector('.clear');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const backspace = document.querySelector('.backspace');
const clearAll = document.querySelector('.clear');

function updateDisplay() {
    mainDisplay.value = displayValue ?? 0;
    mainDisplay["innerHTML"] = displayValue ?? 0;
}

function updateActionDisplay(operator) {
    actionDisplay["innerText"] = operator?.value ?? 'go-go';
}

updateDisplay();

function inputDigit(digit) {
    // updateActionDisplay('')
    console.log(digit)
    if (waitingForSecondOperand === true) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);
    console.log('vvv', inputValue)
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand == null) {
        firstOperand = inputValue;
    } else if (operator) {
        /** */
        const result = operate(operator, firstOperand, inputValue);
        displayValue = String(result);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                return 'Error: Divide by 0';
            }
            return num1 / num2;
        default:
            return num2;
    }
}

digits.forEach((digit) => {
    digit.addEventListener('click', (event) => {
        console.log(digit)
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
    updateActionDisplay('')
    const inputValue = parseFloat(displayValue);
    console.log('COUNT', operator, firstOperand, inputValue)
    if (operator && !waitingForSecondOperand) {
        const result = operate(operator, firstOperand, inputValue);
        displayValue = String(result);
        updateDisplay();
        firstOperand = result;
        operator = null;
    }

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
    if (/^[0-9]$/.test(key)) {
        inputDigit(key);
        updateDisplay();
    } else if (key === '.') {
        inputDecimal(key);
        updateDisplay();
    } else if (/^[\+\-\*\/]$/.test(key)) {
        console.log(key)
        updateActionDisplay({value:key})
        handleOperator(key);
        updateDisplay();
    } else if (key === 'Enter') {
        count()
    } else if (key === 'Backspace') {
        callBackspace()
    }
});
