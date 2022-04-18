const ALLOWED_SPECIAL_CHARACTERS = [
    ' ',
    '-',
    '_'
]

function isTransactionNameValid(name) {
    for (let i = 0; i < name.length; i++) {
        if ((/[a-zA-Z]|-|_| /).test(name.charAt(i)) === false) {
            return false;
        }
    }
    return true;
}

export default isTransactionNameValid;