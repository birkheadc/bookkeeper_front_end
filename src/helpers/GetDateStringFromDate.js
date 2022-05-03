function getDateStringFromDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString().substring(0, 10);
}

export default getDateStringFromDate;