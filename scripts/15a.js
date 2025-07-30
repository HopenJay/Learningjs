import isSatSun from "./wkend.js";
const today = dayjs();
const next5Days = today.add(5, 'day');
const dateString1 = next5Days.format(' MMMM, dddd D')
console.log(dateString1);

const dayjs1 = document.querySelector('.js-dayjs1');
const dayjs2 = document.querySelector('.js-dayjs2');
const dayjs3 = document.querySelector('.js-dayjs3');


dayjs1.innerHTML = dateString1;
dayjs1.style.fontSize = '2em';

const nextMonth = today.add(1, 'month');
const dateString2 = nextMonth.format(' MMMM, dddd D');
console.log(dateString2);

dayjs2.innerHTML = dateString2;
dayjs2.style.fontSize = '2em';

const lastMonth = today.subtract(1, 'month');
const dateString3 = lastMonth.format('MMMM, dddd D');
console.log(dateString3);

dayjs3.innerHTML = dateString3;
dayjs3.style.fontSize = '2em';

const todayString = today.format('dddd');
console.log(todayString);


console.log(isSatSun(todayString));
console.log(isSatSun(dateString1));