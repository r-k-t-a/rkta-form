import React from 'react';
import { Form } from 'rkta-form';

import './App.css';

export default () => (
  <div>
    <h2>Handle Submit</h2>
    <Form onFormSubmit={console.log}>
      <input type="text" name="login" />
      <br />
      <input type="password" name="password" />
      <br />
      <button type="submit">
        Login
      </button>
    </Form>
    <h2>Handle Change</h2>
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
    </Form>
    <h2>Handle Complete (optimised change)</h2>
    <Form onFormComplete={console.log}>
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
    </Form>
  </div>
);
