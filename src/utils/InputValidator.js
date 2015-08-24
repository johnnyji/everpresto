export default class InputValidator {

  static validateEmail(errorMessage, email) {
    let emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (emailRegex.test(email)) {
      return { valid: true };
    }
    return {
      valid: false,
      message: (errorMessage || 'Invalid email format')
    };
  }

  static validateIntegerOnly(errorMessage, ...inputs) {
    let integersRegex = /^\d+$/;
    let invalidCount = 0;

    inputs.forEach(input => {
      let valid = integersRegex.test(input);
      if (!valid) { invalidCount ++; }
    });
    if (invalidCount === 0) {
      return { valid: true };
    }
    return { 
      valid: false, 
      message: (errorMessage || 'Please only enter numbers') 
    };
  }

  static validateLength(errorMessage, length, ...inputs) {
    let invalidCount = 0;

    inputs.forEach(input => {
      if (input == null ) { input = ''; }

      let valid = input.length === length;
      if (!valid) { invalidCount ++; }
    });
    if (invalidCount === 0) {
      return { valid: true };
    }
    return { 
      valid: false, 
      message: (errorMessage || `Must be at least ${length} chars long`) 
    };
  }

  static validateStringPresence(errorMessage, ...inputs) {
    let invalidCount = 0;
    inputs.forEach(input => {
      if (input == null ) { input = ''; }

      let valid = input !== '';
      if (!valid) { invalidCount ++; }
    });
    if (invalidCount === 0) {
      return { valid: true };
    }
    return { 
      valid: false, 
      message: (errorMessage || `Please fill out this field`) 
    };
  }

}