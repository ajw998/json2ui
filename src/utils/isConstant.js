const hasMoreThanOneItem = require('./hasMoreThanOneItem');
/**
 * Check whether value is a constant
 * There are two definitions for constant
 * 1) There is a const property
 * 2) There is an enum array with only a single element
 * @param {object} schema JSON property schema
 * @return {boolean} Boolean representing whether schema is a constant
 */
function isConstant(schema) {
    // By definition, `const` is merely syntactic
    // sugar for `enum` with a single element
    // See https://json-schema.org/understanding-json-schema/reference/generic.html#constant-values
    return Object.prototype.hasOwnProperty.call(schema, 'const') ||
        (schema['enum'] && !hasMoreThanOneItem(schema['enum']));
}

module.exports = isConstant;
