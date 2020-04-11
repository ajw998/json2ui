const hasComplexConditional = require('./utils/hasComplexConditional');
const isConstant = require('./utils/isConstant');
const searchComplexKey = require('./utils/searchComplexKey');
class JSON2UIBase {
    constructor({ schema=null, opts} = {}) {

        /* JSON schema */
        this.schema = schema;

        /* Options */
        this.opts = this.preprocessOpts(opts);

        /* Fields UI info */
        this.fields = null;
    }

    preprocessOpts(opts) {
        const preprocessedOpts = { ...opts };

        // Read UI Schema overrides

        return preprocessedOpts;
    }

    preprocessField(field) {
        if (typeof field !== 'object') {return}

        const complexKey = searchComplexKey(field);
        const struct = {};

        // Checks whether schema is a constant field.
        // This is generally conclusive that the field should be rendered as a simple field
        struct.isNonConstant = !isConstant(field);

        // If the schema is of type 'object', there will generally be a
        // `properties` key inside the schema. This is generally indicative as to
        // whether an item should be rendered as a simple field
        struct.isObjectField = field.type === 'object' ? true : false;

        // Sometimes, we may not explicitly know what the schema `type` is. Our
        // goal here is to know whether the schema accepts a single or compound
        // object. A comound object usually indicated by the existence of the
        // `properties` key.
        struct.isInferredObjectField = Object.prototype.hasOwnProperty.call(field, 'properties');

        // Checks whether the schema contains a complex key which has conditional elements.
        // This is conclusive indication whether it is a simple field
        // Note that the mere use of complex keys does not bar a field from being a simple field.
        struct.hasComplexConditional = complexKey ? field[complexKey].some((item) => hasComplexConditional(item)) : false;

        // Sub-properties are generally conclusive that a field is at least of class `compound`.
        struct.hasSubProperties = Object.prototype.hasOwnProperty.call(field, 'properties');

        // Type array usually indicates compound fields
        struct.isTypeArray = field.type === 'array';

        // A field may be considered a compound field if it is of type `array`
        // and has `items` properties that contains more than one subschema.
        struct.arrayValidation = field.type === 'array' && field.items ? {
        // See https://json-schema.org/understanding-json-schema/reference/array.html
            type: Array.isArray(field.items) ? 'tuple' : 'list'
        } : null;

        return struct;

    }

    processFields(field) {

    }
}

module.exports = JSON2UIBase;
