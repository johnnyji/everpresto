import jwt from 'jsonwebtoken';

export default class TokenHelpers {
  static createToken(assignee, secret, expiresInMinutes) {
    expiresInMinutes = expiresInMinutes || 1440; // defaults to 24 hrs
    return jwt.sign(assignee, secret, {
      expiresInMinutes: expiresInMinutes
    });
  }
}