import React from 'react';

import './App.css';

import Submit from './forms/submit';
import Change from './forms/change';
import Complete from './forms/complete';
import Validate from './forms/validate';

export default () => (
  <div style={{ padding: 16 }}>
    <h4>Handle Submit</h4>
    <Submit />
    <hr />

    <h4>Handle Change</h4>
    <Change />
    <hr />

    <h4>Handle Complete</h4>
    <Complete />
    <hr />

    <h4>Validated Form</h4>
    <Validate />
  </div>
);
