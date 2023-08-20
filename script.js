let a = '';
let b = '';
let operator = '';
let result = '';
let decimalAdded = false;

const keyboardMapping = {
    '0': 'button-0',
    '1': 'button-1',
    '2': 'button-2',
    '3': 'button-3',
    '4': 'button-4',
    '5': 'button-5',
    '6': 'button-6',
    '7': 'button-7',
    '8': 'button-8',
    '9': 'button-9',
    '.': 'button-deci',
    '+': 'button-plus',
    '-': 'button-minus',
    '*': 'button-multi',
    '/': 'button-divi',
    '=': 'button-equal',
    'Enter': 'button-equal',
    'Backspace': 'button-clear',
};

const calc = () => {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', event => {
            const buttonValue = event.target.textContent;
            buttonClick(buttonValue);
        });
    });
    document.addEventListener('keydown', event => {
        const key = event.key;
        if (keyboardMapping.hasOwnProperty(key)) {
            const buttonId = keyboardMapping[key];
            const button = document.getElementById(buttonId);
            if (button) {
                buttonClick(button.textContent);
            }
        }
    });
};

function buttonClick(buttonValue) {
    const display = document.querySelector('.display');
    
    if (!isNaN(buttonValue)) {
        if (operator === '') {
            a += buttonValue;
            display.textContent = a;
        } else {
            b += buttonValue;
            display.textContent = `${a} ${operator} ${b}`;
        }

    } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
        if (a !== '' && b !== '' && operator !== '') {
            result = calculate(parseFloat(a), parseFloat(b), operator);
            display.textContent = formatNumber(result) + ' ' + buttonValue;
            a = result;
            b = '';
            operator = buttonValue;
            result = '';
        } else {
            operator = buttonValue;
            display.textContent = formatNumber(a) + ' ' + operator;
        }

    } else if (buttonValue === '=') {
        if (a !== '' && b !== '' && operator !== '') {
            result = calculate(parseFloat(a), parseFloat(b), operator);
            display.textContent = formatNumber(result);
            a = result;
            b = '';
            operator = '';
            result = '';
        }
    } else if (buttonValue === 'Clear') {
        clearDisplay();
        display.textContent = '0';
        decimalAdded = false;

    } else if (buttonValue === '.') {
        if (a !== '' && b !== '' && operator !== '') {
            display.textContent = `${a} ${operator} ${b}.`
            b = `${b}.`

        } else {
            display.textContent = `${a}.`
            a = `${a}.`
        }
        decimalAdded = true;
    } else if (buttonValue === '%') {
        if (a !== '' && b !== '' && operator !== '') {
            let result = calculate(parseFloat(a), parseFloat(b), operator);
            resultPercent = result * .01
            display.textContent = resultPercent
    } else {
        display.textContent = a*.01
        a = a*.01
        }
    } else if (buttonValue === '+/-') {
        if (a !== '' && b !== '' && operator !== '') {
            let result = calculate(parseFloat(a), parseFloat(b), operator);
            resultChangeSign = result * -1
            display.textContent = resultChangeSign
    } else {
            display.textContent = a*-1
            a = a*-1
        }
    }
    
    if (b.includes('.') && b.endsWith('0')) {
        b = b.replace(/0+$/, '');
    }

    if (operator !== '') {
        display.textContent = `${a} ${operator} ${b}`;
    } else {
        display.textContent = a;
    }
}


function calculate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return num2;
    }
}

function clearDisplay() {
    a = '';
    b = '';
    operator = ''
    result = '';
}

function formatNumber(number) {
    return parseFloat(number).toFixed(2);
};

calc();