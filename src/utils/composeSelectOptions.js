/**
 * Create select options list
 * @param {object} schema JSON field
 * @returns {object} UI Options list
 */
function composeSelectOptions(schema) {
    return schema['enum'].map((value) => {
        return {
            label: value,
            selected: schema['default'] === value ? true : false,
            value,
        };
    });
}

module.exports = composeSelectOptions;
