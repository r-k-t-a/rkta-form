export default testedEvents => {
  const result = {};
  const handlers = testedEvents.reduce((prevHandlers, handlerName) => {
    const nextHandlers = prevHandlers;
    const handler = event => {
      result[handlerName] = handlerName;
      return handlerName === 'validate' ? Promise.resolve(event) : event;
    };
    nextHandlers[handlerName] = handler;
    return nextHandlers;
  }, {});
  return { result, handlers };
};
