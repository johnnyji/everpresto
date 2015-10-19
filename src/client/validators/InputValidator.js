import BaseValidator from './BaseValidator';

const InputValidator = function () {

  // Private Properties
  const integerOnlyRegex = /^\d+$/;
  const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  const defaultErrors = {
    email: 'Invalid Email Format',
    integerOnly: 'Please only enter numbers',
    fieldPresence: 'Please fill out this field',
    passwordConfirmation: 'Passwords must match'
  };

  return {

    validateEmail: (errorMessage, email) => {
      const condition = emailRegex.test(email);
      return BaseValidator.testCondition(
        condition,
        defaultErrors.email, 
        errorMessage
      );
    },

    validatePasswordConfirmation: (errorMessage, password, passwordConfirm) => {
      const condition = password === passwordConfirm;
      return BaseValidator.testCondition(
        condition, 
        defaultErrors.passwordConfirm, 
        errorMessage
      );
    },

    validateIntegerOnly: (errorMessage, ...inputs) => {
      let invalidCount = 0;

      inputs.forEach(input => {
        const valid = integerOnlyRegex.test(input);
        if (!valid) invalidCount ++;
      });

      const condition = invalidCount === 0;

      return BaseValidator.testCondition(
        condition,
        defaultErrors.integerOnly,
        errorMessage
      );
    },

    validateLength: (errorMessage, length, ...inputs) => {
      let invalidCount = 0;

      inputs.forEach(input => {
        if (input == null ) input = '';

        const valid = input.length >= length;
        if (!valid) invalidCount ++;
      });

      const condition = invalidCount === 0;
      return BaseValidator.testCondition(
        condition,
        `Must be at least ${length} chars long`,
        errorMessage
      );
    },

    validateStringPresence(errorMessage, ...inputs) {
      let invalidCount = 0;

      inputs.forEach(input => {
        if (input == null ) input = '';

        const valid = input !== '';
        if (!valid) invalidCount ++;
      });

      const condition = invalidCount === 0;
      return BaseValidator.testCondition(
        condition,
        defaultErrors.fieldPresence,
        errorMessage
      );
    }

  };

};

export default InputValidator;