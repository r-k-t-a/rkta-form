import React from 'react';
import Form from 'rkta-form';

const SubmitableForm = () =>
  <Form onFormSubmit={console.log}>
    <input type="text" name="login" />
    <br />
    <input type="password" name="password" />
    <br />
    <button type="submit">
      Login
    </button>
  </Form>;

export default SubmitableForm;
