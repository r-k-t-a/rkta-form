import React, { Component } from 'react';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';
import omit from 'lodash.omit';
import isElement from 'lodash.iselement';
import isFunction from 'lodash.isfunction';
import isObject from 'lodash.isobject';
import getFormData from 'get-form-data';

export default class Form extends Component {
  static propTypes = {
    children: PropTypes.node,
    live: PropTypes.bool,
    onFormChange: PropTypes.func,
    onFormComplete: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onValidationError: PropTypes.func,
    prevalidate: PropTypes.func,
    validate: PropTypes.func,
    postvalidate: PropTypes.func,
  };
  static defaultProps = {
    children: undefined,
    live: false,
    onFormChange: undefined,
    onFormComplete: undefined,
    onFormSubmit: undefined,
    onValidationError: undefined,
    prevalidate: form => form,
    postvalidate: form => form,
    validate: undefined,
  };
  static childContextTypes = {
    errors: PropTypes.array,
  };

  getChildContext = () => ({ errors: this.errors });
  get formData() {
    return getFormData(this.node);
  }
  get formProps() {
    const keys = Object.keys(Form.propTypes);
    return omit(this.props, keys);
  }
  setErrors = (errors = []) => {
    const { onValidationError } = this.props;
    invariant(Array.isArray(errors), 'Validate should return an Array.');
    this.errors = errors;
    this.forceUpdate();
    if (!onValidationError) return;
    invariant(isFunction(onValidationError), 'onValidationError should be a function.');
    onValidationError(this.errors);
  }
  errors = [];
  reset() {
    this.node.reset();
  }
  hasErrors() {
    return this.errors.length !== 0;
  }
  shouldValidate(handleEvent) {
    const { live } = this.props;
    if (this.hasErrors() || live) return true;
    return isFunction(handleEvent);
  }
  prevalidate = (form) => {
    const { prevalidate } = this.props;
    if (!prevalidate) return Promise.resolve(form);
    invariant(isFunction(prevalidate), 'Prevalidate prop should be a function.');
    const nextForm = prevalidate(form);
    return Promise.resolve(nextForm);
  }
  makeValidator = inputName => (prevalidatedForm) => {
    if (!this.props.validate) return Promise.resolve(prevalidatedForm);
    invariant(isFunction(this.props.validate), 'Validate prop should be a function.');
    invariant(isObject(prevalidatedForm), 'Prevalidate should return a form object.');
    const args = [prevalidatedForm, inputName, this.errors];
    return this.props.validate(...args).catch((errors) => {
      this.setErrors(errors);
      return Promise.reject(errors);
    });
  }
  postvalidate = (validatedForm) => {
    const { postvalidate } = this.props;
    if (!postvalidate) return Promise.resolve(validatedForm);
    this.setErrors([]);
    invariant(isFunction(postvalidate), 'Postvalidate prop should be a function.');
    const nextForm = postvalidate(validatedForm);
    return Promise.resolve(nextForm);
  }
  emitEvent = (handleEvent, inputName) => {
    if (handleEvent) {
      invariant(isFunction(handleEvent), 'Event handler should be a function.');
    } else if (!this.shouldValidate(handleEvent)) {
      if (isFunction(handleEvent)) handleEvent(this.formData);
      return;
    }
    this
      .prevalidate(this.formData)
      .then(this.makeValidator(inputName))
      .then(this.postvalidate)
      .then(handleEvent);
  }
  handleFormChange = (event) => {
    const { onFormChange, onFormComplete } = this.props;
    let handler;
    if (event.nativeEvent.type === 'input') {
      this.lastNode = event.target;
      handler = onFormChange;
    } else {
      handler = onFormComplete || onFormChange;
    }
    this.emitEvent(handler, event.target.name);
    event.stopPropagation();
  }
  handleFormBlur = (event) => {
    let eventHandler;
    if (isElement(this.lastNode) && event.target.isSameNode(this.lastNode)) {
      eventHandler = this.props.onFormComplete;
      this.lastNode = null;
    }
    this.emitEvent(eventHandler, event.target.name);
  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.emitEvent(this.props.onFormSubmit);
  }
  handleRef = (node) => {
    this.node = node;
  }
  render = () => (
    <form
      {...this.formProps}
      onChange={this.handleFormChange}
      onBlur={this.handleFormBlur}
      onSubmit={this.handleFormSubmit}
      ref={this.handleRef}
    >
      {this.props.children}
    </form>
  );
}
