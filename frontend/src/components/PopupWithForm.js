export default function PopupWithForm(props) {

  const {children, title, name, submitButton, isOpen, onClose, onSubmit} = props;

  return (
    <section className={`popup popup-${name} ${isOpen && 'popup_opened'}`}  >
      <div className="popup__container">
        <button className="popup__close-btn" type="button" onClick={onClose}></button>
        <form className="form" name={name} onSubmit={onSubmit}>
          <h2 className="form__title">{title}</h2>
          {children}
          <button className="form__sub-btn" type="submit">{submitButton}</button>
        </form>
      </div>
    </section>
  );
}