import RegexHelper from '../../client/utils/RegexHelper';

const UserValidator = {
  email(value) {
    return RegexHelper.email().regex.test(value);
  },
};

export default UserValidator;