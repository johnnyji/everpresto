const BaseValidator = function () {

  return {
    testCondition: (condition, defaultErr, customErr) => {
      if (condition) return {valid: true};

      return {
        valid: false,
        message: defaultErr || customErr
      };
    }
  };
  
};

export default BaseValidator;