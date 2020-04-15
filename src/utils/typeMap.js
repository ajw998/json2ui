/*
 * Form element type mapping
 * Includes custom mapping for JSON schema
 */
const typeMap = new Map([
    ['boolean', 'checkbox'],
    ['button', 'button'],
    ['checkbox', 'checkbox'],
    ['date', 'date'],
    ['datetime-local', 'datetime-local'],
    ['email', 'email'],
    ['integer', 'number'],
    ['number', 'number'],
    ['password', 'password'],
    ['string', 'text'],
    ['time', 'time'],
    ['url', 'url']
]);

module.exports = typeMap;
