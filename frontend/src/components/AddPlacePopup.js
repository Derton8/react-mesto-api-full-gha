import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function AddPlacePopup(props) {

  const {isOpen, onClose, onAddPlace} = props;

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace({name, link});
  }

  return (
    <PopupWithForm title="Новое место" name="addCard" submitButton="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleAddPlaceSubmit} >
      <input className="form__input" type="text" value={name} onChange={handleNameChange} name="name" placeholder="Название" minLength="2" maxLength="30" required />
      <span className="form__error form-error-name"></span>
      <input className="form__input" type="url" value={link} onChange={handleLinkChange} name="link" placeholder="Ссылка на картинку" required />
      <span className="form__error form-error-link"></span>
    </PopupWithForm>
  );
}