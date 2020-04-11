/**
 * Search for complex schema key (oneOf, anyOf, allOf)
 * and return the first found complex key
 * @param {object} schema JSON proeprty schema
 * @return {string <'oneOf'|'anyOf'|'allOf'>} Complex schema key
 */
function searchComplexKey(schema) {
    return Object.keys(schema).find((key) => ['oneOf', 'anyOf', 'allOf'].includes(key));
}

module.exports = searchComplexKey;
