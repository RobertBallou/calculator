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
    mathP: ${mathP.textContent}
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

        //runOps test #1
        //if their is no lockedNum then number will be transfered to lockedNum. 
        //number is cleared and operator is changed to whichever operator button was pressed.
        if(!lockedNum){
            console.log(`runOps test #1`);
            test();
            lockedNum = (+number);
            number = '';
            operator = opName;
            test();
        }else if (lockedNum && !number && !operator){
            console.log(`runOps test #2`);
            test();
            operator = opName;
            test();
        }else if (lockedNum && number && operator !== opName && total){
            console.log(`runOps test #3`);
            test();
            total = false;
            operator = opName;
            number = "";
            test();

        //runOps test #4
        //if theirs a lockedNum, number, and the operator pressed doesnt match the current operator.
        //then operate is ran with the current operation. That number is put into lockedNum.
        //number is cleared and then the operator is changed to the new operator getting ready for a new calculation.
        //this is usually activated with a chain of operations.
        }else if (lockedNum && number && operator !== opName){
            console.log(`runOps test #4`);
            test();
            lockedNum = operate(operator, lockedNum, (+number));
            operator = opName;
            number ='';
            test();

        //runOps test #$
        //added this if statement because if i hit 5x5 for example and kept pressing enter to keep multiplying the total by 5.
        //then I tried to then i tried to multiply that by something else. it would multiply lockedNum by number. 
        //even though it should be clearing the number to get ready for a new calculation.
        //also clearing the total since we aren hitting the equals button anymore.
        } else if (total && lockedNum && number && operator === opName){
            console.log(`runOps test #5`);
            test();
            number = '';
            total = false;
            test();

            
        } else if(lockedNum && number && operator === opName){
            console.log(`runOps test #6`);
            test();
            lockedNum = operate(operator, lockedNum, (+number));
            number = "";
            test();
        } else if (lockedNum && operator && total){
            console.log(`runOps test #7`);
            test();
            total = false;
            test();
        }
}

// // Operator function that runs math functions
function operate(operator, x, y){
    let opArray = [add(x, y), subtract(x, y), multiply(x, y), divide(x, y)];
    const opNames = ['add', 'subtract', 'multiply', 'divide'];
    for(let i = 0; i < opArray.length; i++){
        if(operator === opNames[i]){
            if(total && number){
                console.log(`operate function test #1`);
                test();
                lockedNum = opArray[i];
                totalNum = '';
                test();
                return lockedNum;
            } else if(total){
                console.log(`operate function test #2`);
                test();
                operator = opNames[i];
                totalNum = '';
                number = '';
                total = false; 
                test();
                return lockedNum;
            } else if (total === false){
                console.log(`operate function test #3`);
                test();
                totalNum = opArray[i];
                test();
                return totalNum;
            }
        }
    }
}

// Operator Button functionality & event listeners
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((button) => {
    button.onclick = () => {
        if (total && lockedNum && operator){
            runOps(button.textContent, button.id);
        } else if (!lockedNum && !number){
            return;
        } else if(mathP.textContent.slice(-1) === '+' || mathP.textContent.slice(-1) === '-' || mathP.textContent.slice(-1) === '÷' || mathP.textContent.slice(-1) === '×'){
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
        if(total){
            number = lockedNum;
            lockedNum = '';
            mathP.textContent += button.textContent;
            number += button.textContent;
            totalP.textContent = '';
            total = false;
        } else {
            mathP.textContent += button.textContent;
            number += button.textContent;
            totalP.textContent = operate(operator, lockedNum, (+number));
        }
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
    if (total){
        number = lockedNum.toString();
        lockedNum = '';
        totalP.textContent = '';
        operator = '';
        total = false;
    }
    if (number.length > 0){
        number = number.slice(0, -1);
        mathP.textContent = mathP.textContent.slice(0, -1);
        totalP.textContent = operate(operator, lockedNum, (+number));
    }
}

document.getElementById('positive-or-negative').onclick = () => {
    if (number.includes('-')){
        mathP.textContent = mathP.textContent.slice(0, -number.length);
        number = number.substring(1);
        mathP.textContent += number;
        totalP.textContent = operate(operator, lockedNum, (+number));
    } else if (!number.includes('-')){
        if(number > 0){
            mathP.textContent = mathP.textContent.slice(0, -number.length);
        }
        number = '-' + number;
        mathP.textContent += number;
        if (number.length > 1){
            totalP.textContent = operate(operator, lockedNum, (+number));
        }
    }
}

// Keyboard event listeners and functionality 
window.addEventListener('keydown', (event) => {
    let name = event.key;
    let code = event.code;
    if (event.key >= 0 && event.key <= 9){
        if(total){
            number = lockedNum;
            lockedNum = '';
            mathP.textContent += event.key;
            number += event.key;
            totalP.textContent = '';
            total = false;
        } else {
            mathP.textContent += event.key;
            number += event.key;
            totalP.textContent = operate(operator, lockedNum, (+number));
        }
    } else if (event.key === 'Enter' || event.key === '='){
        if (lockedNum && number && operator){
            total = true;
            mathP.textContent = operate(operator, lockedNum, (+number));
            totalP.textContent = '';
        } else { 
            return;
        }
    } else if (event.key === "+"){
        if (total && lockedNum && operator){
            runOps(event.key, 'add');
        } else if (!lockedNum && !number){
            return;
        } else if(mathP.textContent.slice(-1) === '+' || mathP.textContent.slice(-1) === '-' || mathP.textContent.slice(-1) === '÷' || mathP.textContent.slice(-1) === '×'){
            return;
        } else {
            runOps(event.key, 'add');
        }
    } else if (event.key === '-'){
        if (total && lockedNum && operator){
            runOps(event.key, 'subtract');
        } else if (!lockedNum && !number){
            return;
        } else if(mathP.textContent.slice(-1) === '+' || mathP.textContent.slice(-1) === '-' || mathP.textContent.slice(-1) === '÷' || mathP.textContent.slice(-1) === '×'){
            return;
        } else {
            runOps(event.key, 'subtract');
        }
    } else if (event.key === '*'){
        if (total && lockedNum && operator){
            runOps('×', 'multiply');
        } else if (!lockedNum && !number){
            return;
        } else if(mathP.textContent.slice(-1) === '+' || mathP.textContent.slice(-1) === '-' || mathP.textContent.slice(-1) === '÷' || mathP.textContent.slice(-1) === '×'){
            return;
        } else {
            runOps('×', 'multiply');
        }
    } else if (event.key ==='/'){
        if (total && lockedNum && operator){
            runOps('÷', 'divide');
        } else if (!lockedNum && !number){
            return;
        } else if(mathP.textContent.slice(-1) === '+' || mathP.textContent.slice(-1) === '-' || mathP.textContent.slice(-1) === '÷' || mathP.textContent.slice(-1) === '×'){
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
        if (total){
            number = lockedNum.toString();
            lockedNum = '';
            totalP.textContent = '';
            operator = '';
            total = false;
        }
        if (number.length > 0){
            number = number.slice(0, -1);
            mathP.textContent = mathP.textContent.slice(0, -1);
            totalP.textContent = operate(operator, lockedNum, (+number));
        }

        //If the number is only a negative sign and nothing else. The total calculation will just display the locked number.
        //which should be any  previous calculation anyway.
        if (number === '-'){
            totalP.textContent = lockedNum;
        }
    //working on the negative to positive / positive to negative button.
    } else if (event.key === '`'){
        if (number.includes('-')){
            mathP.textContent = mathP.textContent.slice(0, -number.length);
            number = number.substring(1);
            mathP.textContent += number;
            totalP.textContent = operate(operator, lockedNum, (+number));
        } else if (!number.includes('-')){
            if(number > 0){
                mathP.textContent = mathP.textContent.slice(0, -number.length);
            }
            number = '-' + number;
            mathP.textContent += number;
            if (number.length > 1){
                totalP.textContent = operate(operator, lockedNum, (+number));
            }
        }
    }
}, false);