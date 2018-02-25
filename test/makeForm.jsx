import React from 'react';
import { mount } from 'enzyme';

import makeEventTracker from './makeEventTracker';
import makeEventEmitter from './makeEventEmitter';
import Form from '../src/Form';

const mountForm = (props, handlers) =>
  mount(
    <Form {...props} {...handlers}>
      <input id="text" type="text" name="text" defaultValue="text" />
      <input id="radio" type="radio" name="radio" defaultValue="radio" defaultChecked />
      <input type="checkbox" name="checkbox" defaultValue="checkbox" defaultChecked />
    </Form>,
  );

module.exports = (props, ...testedEvents) => (...emitArgs) => {
  const tracker = makeEventTracker(testedEvents);
  const form = mountForm(props, tracker.handlers);
  const emit = makeEventEmitter(form, tracker);
  return emit(...emitArgs);
};
