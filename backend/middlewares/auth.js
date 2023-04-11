const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../utils/errors/unauthorized-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError('Необходимо авторизоваться.'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, 'MY_SECRET_KEY');
  } catch (err) {
    next(new UnauthorizedError('Необходимо авторизоваться.'));
    return;
  }
  req.user = payload;
  next();
};
