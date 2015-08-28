export default class ModelValidator {
  constructor() {
    this.emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  }

  validateEmail(value) {
    return this.emailRegex.test(value);
  }

}