import React from 'react';
import PropTypes from 'prop-types';

const InvisibleInput = ({ getRef, ...props }) =>
  <input
    {...props}
    ref={getRef}
    style={{
      opacity: 0,
      position: 'fixed',
      pointerEvents: 'none',
      top: -9999,
      userSelect: 'none',
    }}
  />;

InvisibleInput.propTypes = {
  getRef: PropTypes.func,
};

export default InvisibleInput;
