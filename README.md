# json2ui 

Transform JSON schema into a UI property tree through an opinionated
interpretation of [JSON Schema
Draft-07](https://json-schema.org/specification.html).

## Caveat

This project is a proof-of-concept, specialised interpretation of the JSON
schema and should not be used in production softwares.

## Example

The following JSON schema:

```json
{
	"title": "Example schema",
	"description": "Example description",
	"properties": {
		"name": {
			"$id": "#/properties/name",
			"title": "Example",
			"type": "string",
			"description": "Example description"
		}
	}
}
```
will generate the following:

```js
{
	meta: { description: 'Example description', title: 'Example schema' },
	fields: [
		{
			class: 'simple',
			description: 'Example description',
			example: [],
			fieldKey: '#/properties/name',
			id: 'name',
			title: 'Example',
			props: [Object],
			required: false
		}
	]
}
```

## LICENSE
MIT
