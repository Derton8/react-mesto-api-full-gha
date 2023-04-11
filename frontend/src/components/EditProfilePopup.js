import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function EditProfilePopup(props) {

  const {isOpen, onClose, onUpdateUser} = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name ?? '');
    setDescription(currentUser.about ?? '');
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({name: name, about: description});
  }

  return (
    <PopupWithForm title="Редактировать профиль" name="edit-card" submitButton="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input className="form__input" type="text" value={name} onChange={handleNameChange} name="nick" placeholder="Имя" minLength="2" maxLength="40" required />
      <span className="form__error form-error-nick"></span>
      <input className="form__input" type="text" value={description} onChange={handleDescriptionChange} name="job" placeholder="О себе" minLength="2" maxLength="200" required />
      <span className="form__error form-error-job"></span>
    </PopupWithForm>
  );
}