/**
 * Returns the field type
 * @param {object} schema JSON property schema
 * @param {object} combinedTypeMap type map
 * @returns {string} Field type
 */
function getInputType(schema, combinedTypeMap) {
    if (!schema || !combinedTypeMap) {return}

    return combinedTypeMap.get(schema.type);
}

module.exports = getInputType;
