export default class Validator {
  _testCondition(condition, defaultError, customError) {
    if (condition) {
      return { valid: true };
    }
    return {
      valid: false,
      message: (defaultError || customError)
    };
  }
}