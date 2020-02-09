import PropTypes from 'prop-types';

import useError from './useError';

const Error = ({ children, name }) => {
  const errorMessage = useError(name);
  if (!errorMessage) return null;
  if (typeof children === 'function') return children(errorMessage);
  return errorMessage;
};

Error.propTypes = {
  children: PropTypes.func,
  name: PropTypes.string.isRequired,
};
Error.defaultProps = {
  children: null,
};

export default Error;
