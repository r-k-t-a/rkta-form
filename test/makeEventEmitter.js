export default (form, tracker) =>
  (event, source, eventType) => {
    const element = form.find(source);
    // eslint-disable-next-line
    const { name, type, defaultValue, value } = element.props();
    element.simulate(
      event,
      {
        nativeEvent: {
          type: eventType || event,
        },
        preventDefault: () => null,
        target: {
          name,
          value: value || defaultValue,
          type,
        },
      },
    );
    return new Promise(
      resolve =>
        setTimeout(
          () => resolve(tracker.result),
          32,
        ),
    );
  };
