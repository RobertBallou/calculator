let displayDiv = document.getElementById('display');
let mathP = document.getElementById('math');
let totalP = document.getElementById('total');
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

//Operator function that runs math functions
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
        if(operator === 'subtract'){
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
        if(operator === 'divide'){
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
}

//////////////////////////////
//WORKING ON CONSOLIDAING BUTTON FUNCTIONALITY
//////////////////////////////

//Operator Button functionality
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((button) => {
    console.log(button.textContent);
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

//Number Button functionality
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach((button) => {
    button.onclick = () => {
        mathP.textContent += button.textContent;
        number += button.textContent;
        totalP.textContent = operate(operator, lockedNum, (+number));
    }
});

/////////////////////////////////////////////////

//custom buttons
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















///////////////////////////////////
//Need to work keyboard presses into calculator then consolidate code.
///////////////////////////////////
// window.addEventListener('keydown', (event) => {
//     let name = event.key;
//     let code = event.code;
//     console.log(`Key pressed ${name} \r\n Key code value: ${code}`);
//     if(code === 'Numpad1'){
//         document.getElementById('display').textContent += 1;
//         number += '1';
//     } else if(code === 'Numpad2'){
//         document.getElementById('display').textContent += 2;
//         number += '2';
//     } else if(code === 'Numpad3'){
//         document.getElementById('display').textContent += 3;
//         number += '3';
//     } else if(code === 'Numpad4'){
//         document.getElementById('display').textContent += 4;
//         number += '4';
//     } else if(code === 'Numpad5'){
//         document.getElementById('display').textContent += 5;
//         number += '5';
//     } else if(code === 'Numpad6'){
//         document.getElementById('display').textContent += 6;
//         number += '6';
//     } else if(code === 'Numpad7'){
//         document.getElementById('display').textContent += 7;
//         number += '7';
//     } else if(code === 'Numpad8'){
//         document.getElementById('display').textContent += 8;
//         number += '8';
//     } else if(code === 'Numpad9'){
//         document.getElementById('display').textContent += 9;
//         number += '9';
//     } else if(code === 'Numpad0'){
//         document.getElementById('display').textContent += 0;
//         number += '0';
//     } else if(code === 'NumpadEnter'){
//         document.getElementById('display').textContent = operate(operator, lockedNum, (+number));
//     } else if(code === 'NumpadAdd'){
//         document.getElementById('display').textContent += '+';
//         if(operator){
//             operate(operator, lockedNum, (+number));
//         }
//         operator = 'add';
//         if(!lockedNum){
//             lockedNum = (+number);
//             number = '';
//         }else if (lockedNum && number){
//             operate(operator, lockedNum, (+number));
//         }
//     } 
//   }, false);

























/////////////////////////
//consolidated code below this

function placeholderSave1(){
    ///////////////////////////////////
    // document.getElementById('add').onclick = () => {
    //     mathP.textContent += '+';
    //     if(!lockedNum){
    //         lockedNum = (+number);
    //         number = '';
    //         operator = 'add';
    //     }else if (lockedNum && !number && !operator){
    //         operator = 'add';
    //     }else if (lockedNum && number && operator !== 'add'){
    //         lockedNum = operate(operator, lockedNum, (+number));
    //         operator = 'add';
    //         number ='';
    //     } else if (lockedNum && number && operator === 'add'){
    //         lockedNum = operate(operator, lockedNum, (+number));
    //         number = "";
    //     }
    // }
    
    // document.getElementById('subtract').onclick = () => {
    //     mathP.textContent += '-';
    //     if(!lockedNum){
    //         lockedNum = (+number);
    //         number = '';
    //         operator = 'subtract';
    //     }else if (lockedNum && !number && !operator){
    //         operator = 'subtract';
    //     }else if (lockedNum && number && operator !== 'subtract'){
    //         lockedNum = operate(operator, lockedNum, (+number));
    //         operator = 'subtract';
    //         number ='';
    //     } else if (lockedNum && number && operator === 'subtract'){
    //         lockedNum = operate(operator, lockedNum, (+number));
    //         number = "";
    //     }
    // }
    
    // document.getElementById('multiply').onclick = () => {
    //     mathP.textContent += '×';
    //     if(!lockedNum){
    //         lockedNum = (+number);
    //         number = '';
    //         operator = 'multiply';
    //     }else if (lockedNum && !number && !operator){
    //         operator = 'multiply';
    //     }else if (lockedNum && number && operator !== 'multiply'){
    //         lockedNum = operate(operator, lockedNum, (+number));
    //         operator = 'multiply';
    //         number = "";
    //     } else if(lockedNum && number && operator === 'multiply'){
    //         lockedNum = operate(operator, lockedNum, (+number));
    //         number = '';
    //     }
    // }
    
    // document.getElementById('divide').onclick = () => {
    //     mathP.textContent += '÷';
    //     if(!lockedNum){
    //         lockedNum = (+number);
    //         number = '';
    //         operator = 'divide';
    //     }else if (lockedNum && !number && !operator){
    //         operator = 'divide';
    //     }else if (lockedNum && number && operator !== 'divide'){
    //         lockedNum = operate(operator, lockedNum, (+number));
    //         operator = 'divide';
    //         number ='';
    //     } else if (lockedNum && number && operator === 'divide'){
    //         lockedNum = operate(operator, lockedNum, (+number));
    //         number = "";
    //     }
    // }
    }
    
    function placeholderSave2(){
        // document.getElementById('b1').onclick = () => {
        //     mathP.textContent += 1;
        //     number += '1';
        //     totalP.textContent = operate(operator, lockedNum, (+number));
        // }
        
        // document.getElementById('b2').onclick = () => {
        //     mathP.textContent += 2;
        //     number += '2';
        //     totalP.textContent = operate(operator, lockedNum, (+number));
        // }
        
        // document.getElementById('b3').onclick = () => {
        //     mathP.textContent += 3;
        //     number += '3';
        //     totalP.textContent = operate(operator, lockedNum, (+number));
        // }
        
        // document.getElementById('b4').onclick = () => {
        //     mathP.textContent += 4;
        //     number += '4';
        //     totalP.textContent = operate(operator, lockedNum, (+number));
        // }
        
        // document.getElementById('b5').onclick = () => {
        //     mathP.textContent += 5;
        //     number += '5';
        //     totalP.textContent = operate(operator, lockedNum, (+number));
        // }
        
        // document.getElementById('b6').onclick = () => {
        //     mathP.textContent += 6;
        //     number += '6';
        //     totalP.textContent = operate(operator, lockedNum, (+number));
        // }
        
        // document.getElementById('b7').onclick = () => {
        //     mathP.textContent += 7;
        //     number += '7';
        //     totalP.textContent = operate(operator, lockedNum, (+number));
        // }
        
        // document.getElementById('b8').onclick = () => {
        //     mathP.textContent += 8;
        //     number += '8';
        //     totalP.textContent = operate(operator, lockedNum, (+number));
        // }
        
        // document.getElementById('b9').onclick = () => {
        //     mathP.textContent += 9;
        //     number += '9';
        //     totalP.textContent = operate(operator, lockedNum, (+number));
        // }
        
        // document.getElementById('b0').onclick = () => {
        //     mathP.textContent += 0;
        //     number += '0';
        //     totalP.textContent = operate(operator, lockedNum, (+number));
        // }
    }