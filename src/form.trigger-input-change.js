const triggerInputChange = (node, value) => {
  const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
  const event = new Event('input', { bubbles: true });
  setValue.call(node, value);
  node.dispatchEvent(event);
};

export default triggerInputChange;
