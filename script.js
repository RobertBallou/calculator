let display;
let lockednum1;
let number = '';

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

function operate(){

}

document.getElementById('b1').onclick = () => {
    document.getElementById('display').textContent += 1;
    number += '1';
}

document.getElementById('b2').onclick = () => {
    document.getElementById('display').textContent += 2;
}

document.getElementById('b3').onclick = () => {
    document.getElementById('display').textContent += 3;
}

document.getElementById('b4').onclick = () => {
    document.getElementById('display').textContent += 4;
}

document.getElementById('b5').onclick = () => {
    document.getElementById('display').textContent += 5;
}

document.getElementById('b6').onclick = () => {
    document.getElementById('display').textContent += 6;
}

document.getElementById('b7').onclick = () => {
    document.getElementById('display').textContent += 7;
}

document.getElementById('b8').onclick = () => {
    document.getElementById('display').textContent += 8;
}

document.getElementById('b9').onclick = () => {
    document.getElementById('display').textContent += 9;
}

document.getElementById('b0').onclick = () => {
    document.getElementById('display').textContent += 0;
}

document.getElementById('clear').onclick = () => {
    document.getElementById('display').textContent = '';
}

document.getElementById('add').onclick = () => {
    document.getElementById('display').textContent += '+';
    lockednum1 = (+number);
    console.log(lockednum1)
    number = '';
}

document.getElementById('subtract').onclick = () => {
    document.getElementById('display').textContent += '-';
}

document.getElementById('multiply').onclick = () => {
    document.getElementById('display').textContent += '×';
}

document.getElementById('divide').onclick = () => {
    document.getElementById('display').textContent += '÷';
}