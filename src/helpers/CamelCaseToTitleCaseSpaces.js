function camelCaseToTitleCaseSpaces(input) {
    const result = input.replace(/([A-Z])/g, " $1");
    const output = result.charAt(0).toUpperCase() + result.slice(1);
    return output;
}

export default camelCaseToTitleCaseSpaces;