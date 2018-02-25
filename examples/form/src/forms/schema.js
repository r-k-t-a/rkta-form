export default ({ maximum, minimum }) => ({
  type: 'object',
  properties: {
    text: {
      type: 'string',
      messages: {
        required: 'Please enter a text',
      },
    },
    minimum: {
      type: 'integer',
      maximum,
      minimum: 0,
      messages: {
        type: 'Should be a zero or more',
        minimum: 'Should exceed 0',
      },
    },
    maximum: {
      default: null,
      type: ['integer', 'null'],
      minimum: maximum && { $data: '1/minimum' },
      messages: {
        type: 'Should be a zero or more',
        minimum: `Should exceed ${minimum || 0}`,
      },
    },
  },
  required: ['text', 'minimum'],
});
