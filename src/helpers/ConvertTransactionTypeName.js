function convertTransactionTypeName(name) {
    const newName = name.replaceAll('_', ' ').trim().replace(/\s+/g, ' ');
    const words = newName.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substring(1).toLowerCase();
    }
    return words.join(' ');
}

export default convertTransactionTypeName;