//visual creation part

let calcButtons = [['ON/OFF', 'M+', 'M-', '<img src="bs.svg" alt="backspace"/><p>bk</p>'],['C','(',')','%'] ,[1, 2, 3, 'X'], [4, 5, 6, '/'], [7, 8, 9, '-'], ['.', 0, '=', '+']];

let lowerScreen = document.createElement('div');
lowerScreen.setAttribute('class', 'lower-screen');
lowerScreen.innerText = "0";

let upperScreen = document.createElement('div');
upperScreen.setAttribute('class', 'upper-screen');
upperScreen.innerText = "0";

let calculator = document.createElement('div');
calculator.setAttribute('class', 'calculator');
calculator.append(upperScreen, lowerScreen);

let container = document.createElement('div');
container.setAttribute('class', 'container');
container.append(calculator);

for (i = 0; i < 6; i++) {
    let newRow = document.createElement('div');
    newRow.className = 'button-row';
    for (j = 0; j < 4; j++) {
        let button = document.createElement('div');
        button.className = 'button';
        button.innerHTML = calcButtons[i][j];
        newRow.append(button);
    }
    calculator.append(newRow);
}

document.body.append(container)


//Functional Part

let buttons = document.querySelectorAll('.button');
let index = 0;
let input = [];
let currentInp = '';
let pointFlag = false;
let currentlyOff = false;

let updateDisplayUp = function () {
    let msg = '';
    if(currentlyOff) msg = '';
    else if (!currentInp && !input.length) msg = 0;
    else if (!input.length && currentInp) msg = currentInp;
    else msg = input.join('') + currentInp;

    document.querySelector('.upper-screen').innerText = msg;
}

let updateDisplayDown = function (msg1) {
    msg = msg1 || 0;
    if(currentlyOff) msg= '';
    document.querySelector('.lower-screen').innerText = msg;
}

let getCharacter = function (keyboard) {
    let character = this.innerText||keyboard;
    if(character=='*') character='X';
    switch (character) {
        case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
        case '0': case '.': currentInp += character; break;

        case '+': case '-': case '/': case 'X': case '%': case '(': case ')':
        case '=': addNum(character); break;

        case 'bk': deteleChar(); break;

        case 'C': freshStart(); break;

        case 'ON/OFF': toggleSwitch(); break;
    }
    updateDisplayUp();
};

let addNum = function (operator) {
    if (!currentInp) {
        if (operator == '-') currentInp = '-';
        else if (operator == '+') currentInp = '+';
        else if (operator == '(') {
            parseNum();
            input[length]='(';
            updateDisplayUp();
        }
        else if (operator == ')') {
            parseNum();
            input[length]=')';
            updateDisplayUp();
        }
        else updateDisplayDown('Invalid operation')
    }
    else {
        parseNum();
        currentInp = '';
    }
    function parseNum() {
        if (+currentInp) {
            input[input.length] = +currentInp;
            if(operator=='=') {calculations();return}
            input[input.length] = operator
        }
        else if(operator=='(' || operator==')') return;
        else updateDisplayDown('Invalid input')
    }
}

let deteleChar = function () {
    if (currentInp) {
        currentInp = currentInp.slice(0, -1);
        updateDisplayUp();
    }
    else {
        if (!input.length) return;
        currentInp = input.pop().toString();
        currentInp = currentInp.slice(0, -1);
        updateDisplayUp();
    }
}

let freshStart = function () {
    input = [];
    currentInp = '';
    updateDisplayUp();
    updateDisplayDown();
}

let toggleSwitch= function(){
    currentlyOff = !currentlyOff;
    console.log(currentlyOff);
    freshStart();
}

let calculations = function () {
    let num1 = 0;
    let num2 = 0;
    let opr = ''
    for (val of input) {
        console.log(val);
        if(!num1){ num1 = val;
        console.log('n1:'+num1)}
        else if(isNaN(parseFloat(val))) {opr = val;
        console.log('opr:'+opr)}
        else if(!num2) {
            num2 = val;
            console.log('n2:'+num2)
       
            num1=cal(num1,num2,opr);
            num2 = 0;
            opr = '';
        }
    }
    function cal(n1,n2,op){
        console.log(n1,n2,op)
        switch(op){
            case '+': return n1+n2; break;
            case '-': return n1-n2; break;
            case 'X': return n1*n2; break;
            case '/': return n1/n2; break;
            case '%': return n1%n2; break;
            default: return 0;
        }
    }
    
    document.querySelector('.lower-screen').innerText=num1;
}

Array.from(buttons).forEach(function (element) {
    element.addEventListener('click', getCharacter);
});

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    getCharacter(keyName);
});