import Validator from './Validator';

class InputValidator extends Validator {
  constructor() {
    super();
    this.integerOnlyRegex = /^\d+$/;
    this.emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    this.defaultErrors = {
      email: 'Invalid Email Format',
      integerOnly: 'Please only enter numbers',
      fieldPresence: 'Please fill out this field',
      passwordConfirmation: 'Passwords must match'
    };
  }

  validateEmail(errorMessage, email) {
    let condition = this.emailRegex.test(email);
    return this._testCondition(condition, this.defaultErrors.email, errorMessage);
  }

  validatePasswordConfirmation(errorMessage, password, passwordConfirmation) {
    let condition = password === passwordConfirmation;
    return this._testCondition(condition, this.defaultErrors.passwordConfirmation, errorMessage);
  }

  validateIntegerOnly(errorMessage, ...inputs) {
    let invalidCount = 0;

    inputs.forEach(input => {
      let valid = this.integerOnlyRegex.test(input);
      if (!valid) invalidCount ++;
    }.bind(this));

    let condition = invalidCount === 0;
    return this._testCondition(condition, this.defaultErrors.integerOnly, errorMessage);
  }

  validateLength(errorMessage, length, ...inputs) {
    let invalidCount = 0;

    inputs.forEach(input => {
      if (input == null ) input = '';

      let valid = input.length >= length;
      if (!valid) invalidCount ++;
    });

    let condition = invalidCount === 0;
    return this._testCondition(condition, `Must be at least ${length} chars long`, errorMessage);
  }

  validateStringPresence(errorMessage, ...inputs) {
    let invalidCount = 0;

    inputs.forEach(input => {
      if (input == null ) { input = ''; }

      let valid = input !== '';
      if (!valid) { invalidCount ++; }
    });

    let condition = invalidCount === 0;
    return this._testCondition(condition, this.defaultErrors.fieldPresence, errorMessage);
  }

}

export default new InputValidator;