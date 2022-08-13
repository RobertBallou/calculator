const mathP = document.getElementById('math');
const totalP = document.getElementById('total');
let display;
let total = false;
let lockedNum;
let totalNum;
let number = '';
let operator = '';

//Debug help function
function test(){
    console.log(`
    lockedNum is: ${lockedNum} 
    number is: ${number}
    totalNum is: ${totalNum}
    operator is: ${operator}
    total is: ${total}`)
};


//Math functions
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
//////////////////////////////////////////////////
/////////Working on consolidating operate function
//////////////////////////////////////////////////
function xoperate(operator, x, y){
    if(operator){
        if(total){
            lockedNum = operator(x,y);
            number = '';
            operator = '';
            total = false;
            return lockedNum;
        } else if (total === false){
            totalNum = operator(x, y);
            return totalNum;
        }
    }
}


//Operators function that runs math functions
function operate(operator, x, y){
    if(operator === 'add'){
        if(total){
            lockedNum = add(x, y);
            number = '';
            operator = '';
            total = false;
            return lockedNum;
        } else if(total === false) {
            totalNum = add(x, y);
            return totalNum;
        }
    } else if(operator === 'subtract'){
        if(total){
            lockedNum = subtract(x, y);
            number = '';
            operator = '';
            total = false;
            return lockedNum;
        } else if(total === false) {
            totalNum = subtract(x, y);
            return totalNum;
        }
    } else if (operator === 'multiply'){
        if(total){
            lockedNum = multiply(x,y);
            number = '';
            operator = '';
            total = false;
            return lockedNum;
        } else if(!total){
            totalNum = multiply(x,y);
            return totalNum;
        }
    } else if (operator === 'divide'){
        if(total){
            lockedNum = divide(x, y);
            number = '';
            operator = '';
            total = false;
            return lockedNum;
        } else if(total === false) {
            totalNum = divide(x, y);
            return totalNum;
        }
    }
}

//Operator Button functionality & event listeners
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((button) => {
    button.onclick = () => {
        mathP.textContent += button.textContent;
        if(!lockedNum){
            lockedNum = (+number);
            number = '';
            operator = button.id;
        }else if (lockedNum && !number && !operator){
            operator = button.id;
        }else if (lockedNum && number && operator !== button.id){
            lockedNum = operate(operator, lockedNum, (+number));
            operator = button.id;
            number ='';
        } else if (lockedNum && number && operator === button.id){
            lockedNum = operate(operator, lockedNum, (+number));
            number = "";
        }
    }
});

//Number Button functionality & event listeners
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach((button) => {
    button.onclick = () => {
        mathP.textContent += button.textContent;
        number += button.textContent;
        totalP.textContent = operate(operator, lockedNum, (+number));
    }
});

//Custom button functionality & event listeners
document.getElementById('equals').onclick = () => {
    total = true;
    mathP.textContent = operate(operator, lockedNum, (+number));
    totalP.textContent = '';
    operator = '';
}

document.getElementById('decimal').onclick = () => {
    mathP.textContent += '.';
    number += '.';
}

document.getElementById('clear').onclick = () => {
    mathP.textContent = '';
    totalP.textContent = '';
    lockedNum = '';
    totalNum = '';
    number = '';
    operator = '';
    total = false;
}

//Keyboard functionality and event listeners
window.addEventListener('keydown', (event) => {
    let name = event.key;
    let code = event.code;
    console.log(`Key pressed ${name} \r\n Key code value: ${code} and the event is ${event}`);
    for(let i = 0; i < 10; i++){
        if(code === `Numpad${i}`){
            mathP.textContent += i;
            number += i;
            totalP.textContent = operate(operator, lockedNum, (+number));
        }
    }
    if(code === 'NumpadEnter'){
        total = true;
        mathP.textContent = operate(operator, lockedNum, (+number));
        totalP.textContent = '';
        operator = '';
    } else if (code === 'NumpadAdd'){
        mathP.textContent += '+';
        if(!lockedNum){
            lockedNum = (+number);
            number = '';
            operator = 'add';
        }else if (lockedNum && !number && !operator){
            operator = 'add';
        }else if (lockedNum && number && operator !== 'add'){
            lockedNum = operate(operator, lockedNum, (+number));
            operator = 'add';
            number ='';
        } else if (lockedNum && number && operator === 'add'){
            lockedNum = operate(operator, lockedNum, (+number));
            number = "";
        }
    } else if (code === 'NumpadSubtract'){
        mathP.textContent += '-';
        if(!lockedNum){
            lockedNum = (+number);
            number = '';
            operator = 'subtract';
        }else if (lockedNum && !number && !operator){
            operator = 'subtract';
        }else if (lockedNum && number && operator !== 'subtract'){
            lockedNum = operate(operator, lockedNum, (+number));
            operator = 'subtract';
            number ='';
        } else if (lockedNum && number && operator === 'subtract'){
            lockedNum = operate(operator, lockedNum, (+number));
            number = "";
        }
    } else if (code === 'NumpadMultiply'){
        mathP.textContent += '×';
        if(!lockedNum){
            lockedNum = (+number);
            number = '';
            operator = 'multiply';
        }else if (lockedNum && !number && !operator){
            operator = 'multiply';
        }else if (lockedNum && number && operator !== 'multiply'){
            lockedNum = operate(operator, lockedNum, (+number));
            operator = 'multiply';
            number ='';
        } else if (lockedNum && number && operator === 'multiply'){
            lockedNum = operate(operator, lockedNum, (+number));
            number = "";
        }
    } else if (code === 'NumpadDivide'){
        mathP.textContent += '÷';
        if(!lockedNum){
            lockedNum = (+number);
            number = '';
            operator = 'divide';
        }else if (lockedNum && !number && !operator){
            operator = 'divide';
        }else if (lockedNum && number && operator !== 'divide'){
            lockedNum = operate(operator, lockedNum, (+number));
            operator = 'divide';
            number ='';
        } else if (lockedNum && number && operator === 'divide'){
            lockedNum = operate(operator, lockedNum, (+number));
            number = "";
        }
    }
}, false);