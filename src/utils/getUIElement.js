const isSelect = require('./isSelect');
const isMultiSelect = require('./isMultiSelect');
/**
 * Give a particular property schema, return the HTML element
 * suggestion that best renders the property
 * The parent fields may be rendered in two primary form input elements:
 * <input>, <select>. <textarea> is omitted because there is no way to
 * infer such input purely from reading the JSON property schema.
 * @param {object} schema JSON property schema
 * @param {string} key Schema key (optional)
 * @param {object} override Element override
 * @returns {string} [input] HTML form element
 */
function getUIElement(schema, key='', override={}){
    if (typeof schema !== 'object') {return}

    if (isSelect(schema)) {
        return 'select';
    }

    if (isMultiSelect(schema)) {
        return 'multi-select';
    }

    // Prioritise UI Element overrides
    if (Object.prototype.hasOwnProperty.call(override, key)) {
        return override.key;
    }

    // Default
    return 'input';
}

module.exports = getUIElement;

