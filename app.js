const prev = document.querySelector('.previous');
const curr = document.querySelector('.current');
const btnContainer = document.querySelector('.buttons');

let currOperand = '';
let prevOperand = '';
let oprtn = '';

let equalOrPercentPressed = false;

btnContainer.addEventListener('click', (e) =>{
   if(e.target.classList.contains('num')) {
      appendNumber(e.target.textContent);
      updateDisplay();
   }

   if(e.target.classList.contains('oper')) {
      chooseOperator(e.target.textContent);
      updateDisplay();
   }   
   if(e.target.classList.contains('equal')) {
      calculate();
      updateDisplay();
      equalOrPercentPressed = true;
   }

   if(e.target.classList.contains('ac')) {
      prevOperand = '';
      currOperand = '';
      operation = '';
      updateDisplay();
   }   
  
   if(e.target.classList.contains('pm')) {
      if(!currOperand) return;
      currOperand *= -1;
      updateDisplay();
   }  
  
   if (e.target.classList.contains('percent')) {
    if(!currOperand) return;
    currOperand = currOperand / 100;
    updateDisplay();
    equalOrPercentPressed = true;
   }    
});

const appendNumber = (num) => {
   if (num === '.' && currOperand.includes('.')) return;
   if (currOperand === '0' && num === '0') return;
   if (
      num == "." &&
      curr.innerText.includes("") &&
      currOperand != "0" &&
      currOperand != "0." &&
      curr.innerText == 0
   )
      num = "0.";
   if (currOperand === '0' && num !== '.') {
      currOperand = num;
      return;
    }
   if (currOperand.length > 12) return;
   if (equalOrPercentPressed) {
      currOperand = num;
      equalOrPercentPressed = false;
      return;
   }
    currOperand += num;
};

const updateDisplay = () => {
   if (currOperand.toString().length >12) {
      currOperand = currOperand.toString().slice(0, 12);
   }
   curr.textContent = currOperand;

   if (oprtn && prevOperand) {
      prev.textContent = `${prevOperand} ${oprtn}`;
   }  else {
      prev.textContent = '';
   }
};

const chooseOperator = (op) => {
   if (prevOperand) {
    calculate();
   }
   oprtn = op;
   prevOperand = currOperand;
   currOperand = '';
};

const calculate = () => {
   let calculation = 0;

   const prev = Number(prevOperand);
   const curr = Number(currOperand);

   switch (oprtn) {
      case '+':
         calculation = prev + curr;
         break;
      case '-':
         calculation = prev - curr;
         break;
      case '×':
         calculation = prev * curr;
         break;
      case '÷':
         calculation = prev / curr;
         break;
      default:
         return;         
   }
      currOperand = calculation;
      prevOperand = '';
      oprtn = '';
};

const clickSound = new Audio();
clickSound.src = "sfx.mp3";

function loadContent(num) {
  clickSound.play();
}




