function getFirstDayOfWeekOf(date) {
    const f = new Date(date);
    f.setDate(date.getDate() - date.getDay());
    return f;   
}

function getFirstDayOfMonthOf(date) {
    const f = new Date(date);
    f.setDate(1);
    return f;
}

function getNumberOfDaysInMonthOf(date) {
    const a = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return a.getDate();
}

function getFirstNDaysFromDate(n, date) {
    let dates = [];
    for (let i = 0; i < n; i++) {
        const d = new Date(date);
        d.setDate(d.getDate() + i);
        dates.push(d);
    }
    return dates;
}

function getWeekOf(date) {
    const firstDate = getFirstDayOfWeekOf(date);
    const n = 7;
    return getFirstNDaysFromDate(n, firstDate);
}

function getMonthOf(date) {
    const firstDate = getFirstDayOfMonthOf(date);
    const n = getNumberOfDaysInMonthOf(date);
    return getFirstNDaysFromDate(n, firstDate);
}

function getDatesByDateAndMode(date, mode) {
    const modes = ['day', 'week', 'month'];

    if (modes.includes(mode) === false) {
        return [date];
    }

    if (mode === 'day') {
        return [date];
    }
    
    if (mode === 'week') {
        return getWeekOf(date);
    }

    return getMonthOf(date);
}

export default getDatesByDateAndMode;