require('custom-event-polyfill');

const triggerInputChange = (node, value) => {
  try {
    const event = new CustomEvent('input', { bubbles: true });
    const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    setValue.call(node, value);
    node.dispatchEvent(event);
  } catch (error) {
    window.Bugsnag.notify(error);
  }
};

export default triggerInputChange;
