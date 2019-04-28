import PropTypes from 'prop-types';

const Error = ({ children, name }, { errors }) => {
  const ownErrors = errors.filter(({ property }) => property === name);
  if (ownErrors.length === 0) return null;
  const { message } = ownErrors.shift();
  if (typeof children === 'function') return children(message);
  return message;
};
Error.propTypes = {
  children: PropTypes.func,
  name: PropTypes.string,
};
Error.defaultProps = {
  children: null,
};
Error.contextTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      property: PropTypes.string,
    }),
  ),
};
export default Error;
