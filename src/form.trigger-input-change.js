require('custom-event-polyfill');

const triggerInputChange = (node, value) => {
  const event = new CustomEvent('input', { bubbles: true });
  try {
    const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    setValue.call(node, value);
  } catch (error) {
    node.setAttribute('value', value);
  }
  node.dispatchEvent(event);
};

export default triggerInputChange;
