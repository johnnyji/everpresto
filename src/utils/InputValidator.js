export default class InputValidator {

  static validateEmail(email) {
    let emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return emailRegex.test(email);
  }

  static validateIntegerOnly(input) {
    let integersRegex = /^\d+$/;
    return integersRegex.test(input);
  }

  static validateLength(length, ...inputs) {
    let validity;
    inputs.forEach(input => {
      validity = input.length === length;
    });
    return validity;
  }

  static validateStringPresence(...inputs) {
    let validity;
    inputs.forEach(input => {
      validity = input !== '';
    });
    return validity;
  }

}