export default class InputValidator {

  static validateEmail(email) {
    let emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return emailRegex.test(email);
  }

  static validateIntegerOnly(...inputs) {
    let integersRegex = /^\d+$/;
    return new Promise((resolve, reject) => {
      inputs.forEach(input => {
        let valid = integersRegex.test(input);
        if (!valid) { resolve(false); }
      });
      resolve(true);
    });
  }

  static validateLength(length, ...inputs) {
    return new Promise((resolve, reject) => {
      inputs.forEach(input => {
        if (input === undefined || input === null ) { input = ''; }

        let valid = input.length === length;
        if (!valid) { resolve(false); }
      });
      resolve(true);
    });
  }

  static validateStringPresence(...inputs) {
    return new Promise((resolve, reject) => {
      inputs.forEach(input => {
        if (input === undefined || input === null ) { input = ''; }

        let valid = input !== '';
        if (!valid) { resolve(false); }
      });  
      resolve(true);
    });
  }

}