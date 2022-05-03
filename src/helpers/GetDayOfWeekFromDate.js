import getDaysOfWeekInLocale from "./GetDaysOfWeekInLocale";

function getDayOfWeekFromDate(date) {
    const days = getDaysOfWeekInLocale();
    const d = new Date(date);
    const day = (days[d.getDay()]);
    return day.substring(0, 3);
}

export default getDayOfWeekFromDate;