const express = require('express');

const userRouter = require('./users');
const cardRouter = require('./cards');
const authRouter = require('./auth');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/not-found-err');

const router = express.Router();

router.use('/', authRouter);

// роуты, которым авторизация нужна
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/', (req, res, next) => {
  next(new NotFoundError('Error: 404 Not Found'));
});

module.exports = router;
