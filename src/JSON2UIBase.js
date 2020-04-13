const getFieldClass = require('./utils/getFieldClass');
const hasComplexConditional = require('./utils/hasComplexConditional');
const isConstant = require('./utils/isConstant');
const searchComplexKey = require('./utils/searchComplexKey');

class JSON2UIBase {
    /**
      * Create new UI schema from JSON schema
      * @param {object} schema JSON schema
      * @param {object} opts Additional options
      */
    constructor({ schema=null, opts} = {}) {

        /* JSON schema */
        this.schema = schema && JSON.parse(JSON.stringify(schema));

        /* Options */
        this.opts = this.preprocessOpts(opts);

        /* Meta details */
        this.meta = this.processMeta(this.schema);

        /* Fields UI info */
        this.fields = null;

        /* Required fields */
        this.required = [];
    }

    preprocessOpts(opts) {
        const preprocessedOpts = { ...opts };

        // Read UI Schema overrides
        // Read InputTypeMap overrides

        return preprocessedOpts;
    }

    /**
     * Preprocesses field information
     * @param {object} field Field schema
     * @return {object} Preprocessed information
     */
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

    /**
    * Composes common properties for all field classes
    * These are properties that provides information to the field, and usually
    * contains information extracted from `Annotations` properties.
    * An exception is made to `default` property as it has functional usage.
    * See https://json-schema.org/understanding-json-schema/reference/generic.html#annotations
    * @param {object} field  Parsed schema
    * @param {object} id Used to identify the field
    * @returns {object} Common properties
    */
    processCommonProps(field, id='') {
        if (typeof field !== 'object') {return}

        return {
            description: field.description || '',
            example: field.example || [],
            fieldKey: field.$id || '',
            id,
            title: field.title || '',
        };
    }

    processMeta(schema) {
        if (typeof schema !== 'object') {return}

        return {
            description: schema.description || '',
            title: schema.title || '',
        };
    }

    /**
      * Creates a UI property object for a given field
      * @param {object} field JSON field
      * @param {string} id JSON field id
      * @return {object} Field UI schema
      */

    processFields(field, id) {
        if (typeof field !== 'object') {return}

        const preprocessedInfo = this.preprocessField(field);

        // Field UI Properties
        const fieldClass = getFieldClass(preprocessedInfo);
        const commonProps = this.processCommonProps(field, id);
        const required = this.required.includes(id);

        return {
            class: fieldClass,
            ...commonProps,
            required
        };
    }
}

module.exports = JSON2UIBase;
