function toSnakeCase(s) {
    const a = s.replaceAll(' ', '_').trim();
    return a.toLowerCase();
}

export default toSnakeCase;