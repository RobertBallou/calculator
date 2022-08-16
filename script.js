const mathP = document.getElementById('math');
const totalP = document.getElementById('total');
let display;
let total = false;
let lockedNum = '';
let totalNum = '';
let number = '';
let operator = '';

// Debug help function
function test(){
    console.log(`
    lockedNum is: ${lockedNum} 
    number is: ${number}
    totalNum is: ${totalNum}
    operator is: ${operator}
    total is: ${total}`)
};

// Reset all options on the calculator
function reset(){
    mathP.textContent = '';
    totalP.textContent = '';
    total = false;
    lockedNum = '';
    totalNum = '';
    number = '';
    operator = '';
}

// Math functions
function add(x, y){
    return x + y;
}

function subtract(x, y){
    return x - y;
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    return x/y;
}

// function for event listeners to use so I dont have to rewrite for all operation events.
function runOps(symbol, opName){
    mathP.textContent += symbol;
        if(!lockedNum){
            console.log(`1st runOps for symbol: ${symbol} & opName ${opName}`)
            test()
            lockedNum = (+number);
            number = '';
            operator = opName;
            test()
        }else if (lockedNum && !number && !operator){
            console.log(`2nd runOps for symbol: ${symbol} & opName ${opName}`)
            test()
            operator = opName;
            test()
        }else if (lockedNum && number && operator !== opName && total){
            console.log(`3rd runOps for symbol: ${symbol} & opName ${opName}`)
            test()
            total = false;
            operator = opName;
            number = "";
            test()
        }else if (lockedNum && number && operator !== opName){
            console.log(`4th runOps for symbol: ${symbol} & opName ${opName}`)
            test()
            lockedNum = operate(operator, lockedNum, (+number));
            operator = opName;
            number ='';
            test()
        } else if (lockedNum && number && operator === opName){
            console.log(`5th runOps for symbol: ${symbol} & opName ${opName}`)
            test()
            lockedNum = operate(operator, lockedNum, (+number));
            number = "";
            test()
        } else if (lockedNum && operator && total){
            console.log(`6th runOps for symbol: ${symbol} & opName ${opName}`)
            test()
            total = false;
            test()
        }
}

// // Operator function that runs math functions
function operate(operator, x, y){
    let opArray = [add(x, y), subtract(x, y), multiply(x, y), divide(x, y)];
    const opNames = ['add', 'subtract', 'multiply', 'divide'];
    for(let i = 0; i < opArray.length; i++){
        if(operator === opNames[i]){
            if(total && number){
                console.log(`1st operate function for ${operator}, ${x}, ${y}`)
                test()
                lockedNum = opArray[i];
                totalNum = '';
                test()
                return lockedNum;
            } else if(total){
                console.log(`2nd operate function for ${operator}, ${x}, ${y}`)
                test()
                operator = opNames[i];
                totalNum = '';
                number = '';
                total = false; 
                test()
                return lockedNum;
            } else if (total === false){
                console.log(`3rd operate function for ${operator}, ${x}, ${y}`)
                test()
                totalNum = opArray[i];
                test()
                return totalNum;
            }
        }
    }
}

// Operator Button functionality & event listeners
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((button) => {
    button.onclick = () => {
        if(mathP.textContent.slice(-1) === '+' || mathP.textContent.slice(-1) === '-' || mathP.textContent.slice(-1) === '÷' || mathP.textContent.slice(-1) === '×'){
            return;
        } else {
            runOps(button.textContent, button.id);
        }
    }
});

// Number Button functionality & event listeners
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach((button) => {
    button.onclick = () => {
        mathP.textContent += button.textContent;
        number += button.textContent;
        totalP.textContent = operate(operator, lockedNum, (+number));
    }
});

// Custom button functionality & event listeners
document.getElementById('equals').onclick = () => {
    total = true;
    mathP.textContent = operate(operator, lockedNum, (+number));
    totalP.textContent = '';
}

document.getElementById('decimal').onclick = () => {
    if (number.includes('.')){
        return;
    } else if (!number.includes('.')){
        mathP.textContent += '.';
        number += '.';
    }
}

document.getElementById('clear').onclick = () => {
    reset();
}

document.getElementById('delete').onclick = () => {
    if (number.length > 0){
        number = number.slice(0, -1);
        mathP.textContent = mathP.textContent.slice(0, -1);
        totalP.textContent = operate(operator, lockedNum, (+number));
    }
}

// Keyboard event listeners and functionality 
window.addEventListener('keydown', (event) => {
    let name = event.key;
    let code = event.code;
    console.log(event.key)
    if (event.key >= 0 && event.key <= 9){
        mathP.textContent += event.key;
        number += event.key;
        totalP.textContent = operate(operator, lockedNum, (+number));
    } else if (event.key === 'Enter' || event.key === '='){
        total = true;
        mathP.textContent = operate(operator, lockedNum, (+number));
        totalP.textContent = '';
    } else if (event.key === "+"){
        if(mathP.textContent.slice(-1) === '+' || mathP.textContent.slice(-1) === '-' || mathP.textContent.slice(-1) === '÷' || mathP.textContent.slice(-1) === '×'){
            return;
        } else {
            runOps(event.key, 'add');
        }
    } else if (event.key === '-'){
        if(mathP.textContent.slice(-1) === '+' || mathP.textContent.slice(-1) === '-' || mathP.textContent.slice(-1) === '÷' || mathP.textContent.slice(-1) === '×'){
            return;
        } else {
            runOps(event.key, 'subtract');
        }
    } else if (event.key === '*'){
        if(mathP.textContent.slice(-1) === '+' || mathP.textContent.slice(-1) === '-' || mathP.textContent.slice(-1) === '÷' || mathP.textContent.slice(-1) === '×'){
            return;
        } else {
            runOps('×', 'multiply');
        }
    } else if (event.key ==='/'){
        if(mathP.textContent.slice(-1) === '+' || mathP.textContent.slice(-1) === '-' || mathP.textContent.slice(-1) === '÷' || mathP.textContent.slice(-1) === '×'){
            return;
        } else {
            runOps('÷', 'divide');
        }
    } else if (event.key === 'c'){
        reset();
    } else if (event.key === '.'){
        if (number.includes('.')){
            return;
        } else if (!number.includes('.')){
            mathP.textContent += '.';
            number += '.';
        }
    } else if (event.key === 'Backspace'){
        if (number.length > 0){
            number = number.slice(0, -1);
            mathP.textContent = mathP.textContent.slice(0, -1);
            totalP.textContent = operate(operator, lockedNum, (+number));
        }
    }
}, false);