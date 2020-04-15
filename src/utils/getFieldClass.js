/**
 * Determines the field class
 * @param {object} structInfo Schema structure information
 * @return {string <'simple'|'compound'|'conditional'|'complex'>}['simple'] Field class
 */
function getFieldClass(structInfo) {
    // Compound fields are composites of simple fields.
    // They do not conditionally render other fields
    if ((structInfo.isTypeArray || structInfo.hasSubProperties || structInfo.isObjectField)
        && !structInfo.hasComplexConditional){
        return 'compound';
    }

    // This is simple, if the field is condtional, then return 'conditional'
    if (!(structInfo.isObjectField) && structInfo.hasComplexConditional) {
        return 'conditional';
    }

    // Complex fields must satisfy two requirements.
    // First, it must have n number of simple fields, where n > 1
    // Second, one or more of these simple fields must conditionally render k other fields.
    // This logically follows that the field must receive an object.
    if (structInfo.hasComplexConditional &&
        (structInfo.isObjectField || structInfo.isInferredObjectField)) {
        return 'complex';
    }

    return 'simple';
}

module.exports = getFieldClass;
