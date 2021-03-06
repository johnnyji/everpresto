const RegexHelper = {
  email(customError) {
    return {
      regex: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      error: customError || 'Please enter a valid email address.'
    };
  },
  matchValue(value, customError) {
    return {
      regex: new RegExp(`^${value}$`),
      error: customError || `Value must match: ${value}.`
    }
  },
  minLength(length, customError) {
    return {
      regex: new RegExp(`.{${length},}`),
      error: customError || `Must be at least ${length} characters.`
    };
  },
  maxLength(length, customError) {
    return {
      regex: new RegExp(`.{0,${length}}`),
      error: customError || `Must be less than ${length} characters.`
    }
  },
  minMaxLength(min, max, customError) {
    return {
      regex: new RegExp(`.{${min},${max}}`),
      error: customError || `Must be between ${min} and ${max} characters.`
    }
  },
  noLowerCase(customError) {
    return {
      regex: /^[^a-z]*$/,
      error: customError || 'No lower case characters allowed.'
    }
  }
};

export default RegexHelper;