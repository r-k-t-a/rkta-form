export default (a, b) => {
  try {
    return a.isSameNode(b);
  } catch (e) {
    return a === b;
  }
};
