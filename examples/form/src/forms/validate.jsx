import React from 'react';
import Form, { Error } from 'rkta-form';
import makeValidator from 'rkta-validator';

import makeSchema from './schema';

const toFloat = (string) => {
  const float = parseFloat(string);
  return Number.isNaN(float) ? undefined : float;
};

const prevalidate = ({ minimum, maximum, ...form }) => ({
  ...form,
  minimum: toFloat(minimum),
  maximum: toFloat(maximum),
  prevalidate: 'prevalidate hook allows to modify form data, before validation',
});
const validate = makeValidator(makeSchema);
const postvalidate = form => ({
  ...form,
  postvalidate: 'prevalidate hook allows to modify form data, after validation',
});

const ChangeForm = () =>
  <Form
    prevalidate={prevalidate}
    validate={validate}
    postvalidate={postvalidate}
    onFormSubmit={console.log}
  >
    <div>
      <strong>Text</strong>
      <br />
      <input type="text" name="text" />
      <Error name="text" />
    </div>
    <br />
    <div>
      <strong>Minimum</strong>
      <br />
      <input type="text" name="minimum" />
      <Error name="minimum" />
    </div>
    <br />
    <div>
      <strong>Maximum</strong>
      <br />
      <input type="text" name="maximum" />
      <Error name="maximum" />
    </div>
    <button type="submit">
      Submit
    </button>
  </Form>;

export default ChangeForm;
