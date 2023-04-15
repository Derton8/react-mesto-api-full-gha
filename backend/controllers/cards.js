const Card = require('../models/card');
const BadRequestError = require('../utils/errors/bad-req-err');
const ForbiddenError = require('../utils/errors/forbidden-err');
const NotFoundError = require('../utils/errors/not-found-err');

module.exports.getCards = ((req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards.reverse() }))
    .catch(next);
});

module.exports.createCard = ((req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((data) => data.populate(['owner', 'likes']).then((card) => res.send({ data: card })))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
        return;
      }
      next(err);
    });
});

module.exports.deleteCard = ((req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById(cardId)
    .orFail(new NotFoundError('Карточка с указанным id не найдена.'))
    .then(async (card) => {
      if (userId.toString() !== card.owner.toString()) {
        return next(new ForbiddenError('Карточка принадлежит другому пользователю.'));
      }
      const cardDelete = await card.deleteOne();
      return res.send({ data: cardDelete });
    })
    .catch(next);
});

module.exports.likeCard = ((req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  // $addToSet: добавить _id в массив, если его там нет
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .orFail(new NotFoundError('Карточка с указанным id не найдена.'))
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch(next);
});

module.exports.dislikeCard = ((req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  // $pull: убрать _id из массива
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(new NotFoundError('Карточка с указанным id не найдена.'))
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch(next);
});
