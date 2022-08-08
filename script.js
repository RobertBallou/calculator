let display;
let lockedNum;
let number = '';
let operator = '';

function test(){
    console.log(`
    lockedNum is: ${lockedNum} 
    number is: ${number} 
    operator is: ${operator}`)
};

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

function operate(operator, x, y){
    if(operator === 'add'){
        lockedNum = add(x, y);
        number = '';
        operator = '';
        return lockedNum;
    }else if(operator === 'subtract'){
        lockedNum = subtract(x, y);
        number = '';
        operator = '';
        return lockedNum;
    }else if (operator === 'multiply'){
        lockedNum = multiply(x, y);
        number = '';
        operator = '';
        return lockedNum
    }else if(operator === 'divide'){
        // if(y === 0){
        //     number = '';
        //     operator = '';
        //     lockedNum = '';
        //     return 'To infinity and beyond!';
        // }else {
        lockedNum = divide(x, y);
        number = '';
        operator = '';
        return lockedNum;
        // }
    }
}

document.getElementById('add').onclick = () => {
    document.getElementById('display').textContent += '+';
    if(operator){
        operate(operator, lockedNum, (+number));
    }
    operator = 'add';
    if(!lockedNum){
        lockedNum = (+number);
        number = '';
    }else if (lockedNum && number){
        operate(operator, lockedNum, (+number));
    }
}

document.getElementById('subtract').onclick = () => {
    document.getElementById('display').textContent += '-';
    if(operator){
        operate(operator, lockedNum, (+number));
    }
    operator = 'subtract';
    if(!lockedNum){
        lockedNum = (+number);
        number = '';
    }else if (lockedNum && number){
        operate(operator, lockedNum, (+number));
    }
}

document.getElementById('multiply').onclick = () => {
    document.getElementById('display').textContent += '×';
    if(operator){
        operate(operator, lockedNum, (+number));
    }
    operator = 'multiply';
    if(!lockedNum){
        lockedNum = (+number);
        number = '';
    }else if (lockedNum && number){
        operate(operator, lockedNum, (+number));
    }
}

document.getElementById('divide').onclick = () => {
    document.getElementById('display').textContent += '÷';
    if(operator){
        operate(operator, lockedNum, (+number));
    }
    operator = 'divide';
    if(!lockedNum){
        lockedNum = (+number);
        number = '';
    }else if (lockedNum && number){
        operate(operator, lockedNum, (+number));
    }
}

document.getElementById('equals').onclick = () => {
    document.getElementById('display').textContent = operate(operator, lockedNum, (+number));
}

document.getElementById('b1').onclick = () => {
    document.getElementById('display').textContent += 1;
    number += '1';
}

document.getElementById('b2').onclick = () => {
    document.getElementById('display').textContent += 2;
    number += '2';
}

document.getElementById('b3').onclick = () => {
    document.getElementById('display').textContent += 3;
    number += '3';
}

document.getElementById('b4').onclick = () => {
    document.getElementById('display').textContent += 4;
    number += '4';
}

document.getElementById('b5').onclick = () => {
    document.getElementById('display').textContent += 5;
    number += '5';
}

document.getElementById('b6').onclick = () => {
    document.getElementById('display').textContent += 6;
    number += '6';
}

document.getElementById('b7').onclick = () => {
    document.getElementById('display').textContent += 7;
    number += '7';
}

document.getElementById('b8').onclick = () => {
    document.getElementById('display').textContent += 8;
    number += '8';
}

document.getElementById('b9').onclick = () => {
    document.getElementById('display').textContent += 9;
    number += '9';
}

document.getElementById('b0').onclick = () => {
    document.getElementById('display').textContent += 0;
    number += '0';
}

document.getElementById('clear').onclick = () => {
    document.getElementById('display').textContent = '';
    lockedNum = '';
    number = '';
    operator = '';
}