import React from 'react';
import Form from 'rkta-form';

const ChangeForm = () =>
  <Form onFormChange={console.log}>
    <textarea name="text" cols="30" rows="10" />
    <div>
      <label>
        <input type="checkbox" name="option" defaultValue="1" /> Option 1
      </label>
    </div>
    <div>
      <label>
        <input type="checkbox" name="option" defaultValue="2" /> Option 2
      </label>
    </div>
  </Form>;

export default ChangeForm;
