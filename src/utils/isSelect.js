const isConstant = require('./isConstant');
const hasMoreThanOneItem = require('./hasMoreThanOneItem');
/**
* Check whether field should be rendered with a <select> elemeent
* @param {object} schema JSON property schema
* @returns {boolean} Whether the schema should be rendered as a <select> element
*/
function isSelect(schema) {
    const altProperty = schema.oneOf || schema.anyOf || schema.allOf;
    // Constants cannot be rendered with `select`
    if (hasMoreThanOneItem(schema['enum'])) { return true }
    // If every element in complex key group is a const,
    // then it should be rendered with a select element
    if (altProperty && Array.isArray(altProperty)) {
        return altProperty.every((item) => isConstant(item));
    }

    return false;
}

module.exports = isSelect;
