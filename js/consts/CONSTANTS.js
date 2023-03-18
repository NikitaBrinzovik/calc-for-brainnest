export const OPERATORS = Object.freeze({
    Plus: '+',
    Minus: '-',
    Divide: '/',
    Multiply: '*',
});

export const ERRORS = Object.freeze({
    DivideByZero: 'Error: Divide by 0',
})

export const CONSTANTS = Object.freeze({
    stringZero: '0',
})

export const KEYS = Object.freeze({
    Enter: 'Enter',
    Backspace: 'Backspace',
    Operators: '/^[\\+\\-\\*\\/]$/',
    Digits: '/^[0-9]$/',
})
