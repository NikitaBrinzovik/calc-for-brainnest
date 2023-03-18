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
// export const MESSAGE = Object.freeze({
//     abortOrContinue: "Well, well, well, do you desire to conclude this amusingly entertaining" +
//         " activity? Please type 'no' to continue indulging in this fascinating game, or type" +
//         " 'yes' to abandon this magnificent creation of the almighty megabrain!",
//     abort: "Oh! That's your choice - you will regret!"
// })
