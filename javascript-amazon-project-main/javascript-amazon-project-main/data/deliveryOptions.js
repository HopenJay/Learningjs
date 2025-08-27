import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

    return deliveryOption || deliveryOption[0];
}

export function validDeliveryOption(deliveryOptionId) {
    let found = false;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            found = true;
        }
    });

    return found
}
function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}
export function calculateDeliveryDate(deliveryOption) {
// I don't understand this code just copied it form supersimpledev. But it's meant to prevent weekends
    let remainingDays = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();
// for tracking the days.{Incase for future reference, it's from lesson 15m of js lesson}
    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day');
        if(!isWeekend(deliveryDate)) {
            // The code below isn't counting the days is jus tracking or timing how long till it reachees he day.
            remainingDays--;
        }
    }
         const dateString = deliveryDate.format('dddd, MMMM D');
         return dateString;
}