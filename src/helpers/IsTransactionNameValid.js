function isTransactionNameValid(name) {
    if (name == null) {
        return false;
    }
    if (/\S/.test(name) === false) {
        return false;
    }
    for (let i = 0; i < name.length; i++) {
        if ((/[a-zA-Z]|-|_| /).test(name.charAt(i)) === false) {
            return false;
        }
    }
    return true;
}

export default isTransactionNameValid;