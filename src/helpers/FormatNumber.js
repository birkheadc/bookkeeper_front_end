function formatNumber(number) {
    const format = Intl.NumberFormat('KR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    let output = format.format(number);
    return output;
}

export default formatNumber;