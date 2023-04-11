import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Card(props) {

  const {card, onCardClick, onCardLike, onCardDelete} = props;

  // Подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(user => user._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `photo-grid__button ${isLiked && 'photo-grid__button_active'}` 
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <figure className="photo-grid__item">
      <img className="photo-grid__img" alt={card.name} src={card.link} onClick={handleClick} />
      {isOwn && <button className="photo-grid__delete-button" type="button" onClick={handleDeleteClick}></button>}
      <figcaption className="photo-grid__caption">
        <h2 className="photo-grid__title">{card.name}</h2>
        <div className="photo-grid__container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="photo-grid__counter">{card.likes.length}</p>
        </div>
      </figcaption>  
    </figure>
  );
}