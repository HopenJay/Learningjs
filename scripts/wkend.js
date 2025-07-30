
export default function isWeekend(date) {
    if (date === 'Saturday' || date === 'Sunday') {
        return 'it\'s weekend'; 
    }
    return 'it\'s not weekend';
}