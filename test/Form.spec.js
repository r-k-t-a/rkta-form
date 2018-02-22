require('./init');
const makeForm = require('./makeForm');

describe('live=false', () => {
  const emit = makeForm({}, 'prevalidate', 'validate', 'postvalidate');
  it('does not not validate', () =>
    emit('change', '#text')
      .should
      .eventually
      .deep
      .equal({}));
});

describe('live=true', () => {
  const emit = makeForm({ live: true }, 'prevalidate', 'validate', 'postvalidate');
  it('validates', () =>
    emit('change', '#text', 'input')
      .should
      .eventually
      .deep
      .equal({
        prevalidate: 'prevalidate',
        validate: 'validate',
        postvalidate: 'postvalidate',
      }));
});

describe('onFormChange', () => {
  const emit = makeForm({}, 'onFormChange', 'validate');
  it('validates and then triggers onFormChange', () =>
    emit('change', '#text', 'input')
      .should
      .eventually
      .deep
      .equal({
        validate: 'validate',
        onFormChange: 'onFormChange',
      }));
});

describe('onFormComplete', () => {
  const emit = makeForm({}, 'onFormComplete', 'validate');
  it('validates and then triggers onFormComplete', () =>
    emit('change', '#text')
      .should
      .eventually
      .deep
      .equal({
        validate: 'validate',
        onFormComplete: 'onFormComplete',
      }));
});

describe('onFormSubmit', () => {
  const emit = makeForm({}, 'onFormSubmit', 'validate');
  it('validates and then triggers onFormSubmit', () =>
    emit('submit', 'form')
      .should
      .eventually
      .deep
      .equal({
        validate: 'validate',
        onFormSubmit: 'onFormSubmit',
      }));
});

describe('onValidationError', () => {
  const validate = () => Promise.reject([]); // eslint-disable-line
  const emit = makeForm({ validate }, 'onFormSubmit', 'onValidationError');
  it('triggers onValidationError', () =>
    emit('submit', 'form')
      .should
      .eventually
      .deep
      .equal({
        onValidationError: 'onValidationError',
      }));
});

describe('validation flow', () => {
  const data = {};
  const prevalidate = (form) => {
    const prevalidatedForm = Object.assign({}, form, { prevalidated: true });
    return prevalidatedForm;
  };
  const validate = (form) => {
    const validatedForm = Object.assign({}, form, { validated: true });
    return Promise.resolve(validatedForm);
  };
  const postvalidate = (form) => {
    const postvalidatedForm = Object.assign(data, form, { postvalidated: true });
    return postvalidatedForm;
  };

  const emit = makeForm({ prevalidate, validate, postvalidate }, 'onFormSubmit');
  it('passes data down the validation pipeline', () =>
    emit('submit', 'form')
      .then(result => Object.assign(result, data))
      .should
      .eventually
      .deep
      .equal({
        text: 'text',
        radio: 'radio',
        checkbox: 'checkbox',
        onFormSubmit: 'onFormSubmit',
        prevalidated: true,
        validated: true,
        postvalidated: true,
      }));
});
