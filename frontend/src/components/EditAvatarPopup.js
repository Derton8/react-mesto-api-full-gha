import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function EditAvatarPopup(props) {

  const {isOpen, onClose, onUpdateAvatar} = props;

  const linkRef = useRef();

  useEffect(() => {
    linkRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({link: linkRef.current.value});
} 

  return (
    <PopupWithForm title="Обновить аватар" name="edit-avatar" submitButton="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input className="form__input" type="url" ref={linkRef} name="link" placeholder="Ссылка на картинку" required />
      <span className="form__error form-error-link"></span>
    </PopupWithForm>
  );
}