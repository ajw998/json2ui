/**
 * Check if an array has more than one item
 * @param {array} array Input array
 * @returns {boolean} Has more than 1 item inside array
 */
function hasMoreThanOneItem(array) {
    if (!Array.isArray(array)) {return}
    return array.length > 1;
}

module.exports = hasMoreThanOneItem;
