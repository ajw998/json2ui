/**
 * Checks whether complex key array item is a conditional subschema
 * For example: { if: { // pass }, then: { //pass } }
 * @param {object} schema JSON schema property
 * @returns {boolean} Has conditional subschema
 */
function hasComplexConditional(schema) {
    if (typeof schema !== 'object') {return}

    if (Object.prototype.hasOwnProperty.call(schema, 'if') &&
        Object.prototype.hasOwnProperty.call(schema, 'then')) {
        return true;
    }

    return false;
}

module.exports = hasComplexConditional;

