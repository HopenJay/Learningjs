const button = document.querySelector('.js-button');
const toggle = document.querySelector('.toggle');
const toggle1 = document.querySelector('.jss')

function toggled(value) {
    const buttons = value;
    if (buttons.classList.contains('is-toggled')) {
        buttons.classList.remove('is-toggled');
    }
    else{
        turnOffPreviousButton();
        buttons.classList.add('is-toggled');
    }
}

function turnOffPreviousButton() {
    const previousButton = document.querySelector('.is-toggled');
    if (previousButton) {
        previousButton.classList.remove('is-toggled');
    }
}
// function toggled(element) {
//     if (element.classList.contains('is-toggled')) {
//         element.classList.remove('is-toggled');
//     } else {
//         element.classList.add('is-toggled');
//     }
// }

if (button.classList.contains('js-button') === true) {
    console.log('it has it');
}


