let a = '';
let b = '';
let operator = '';
let result = '';

const calc = () => {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', event => {
            const buttonValue = event.target.textContent;
            buttonClick(buttonValue);
        });
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
            result = calculate (parseFloat(a), parseFloat(b), operator);
            display.textContent = `${result} ${buttonValue}`;
            a = result.toString();
            b = '';
            operator = buttonValue;
            result = '';
        } else {
            operator = buttonValue;
            display.textContent = `${a} ${operator}`;
        }

    } else if (buttonValue === '=') {
        if (a !== '' && b !== '' && operator !== '') {
            result = calculate(parseFloat(a), parseFloat(b), operator);
            display.textContent = result;
            // Reset variables for the next calculation
            a = result.toString();
            b = '';
            operator = '';
            result = '';
        }
    } else if (buttonValue === 'Clear') {
        clearDisplay();
        display.textContent = '0';
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

calc();