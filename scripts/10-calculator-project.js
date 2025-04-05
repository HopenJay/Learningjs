const para = document.querySelector('.js-p');

let calculation = localStorage.getItem('calculation') || '';

function updateCalculation(value) {
  calculation += value;
  para.innerHTML = calculation;
  console.log(calculation);
  localStorage.setItem('calculation', calculation);
}

// localStorage.setItem('calc', JSON.stringify(updateCalculation(value)))