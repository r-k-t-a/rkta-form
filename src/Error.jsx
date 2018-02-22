import PropTypes from 'prop-types';

const Error = ({ name }, { errors }) => {
  const ownErrors = errors.filter(({ property }) => property === name);
  if (ownErrors.length === 0) return null;
  const { message } = ownErrors.shift();
  return message;
};
Error.defaultProps = {
  name: PropTypes.string,
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
