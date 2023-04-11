export default function ImagePopup(props) {

  const {card, isOpen, onClose} = props;

  return (
    <section className={`popup popup_image popup-image ${isOpen && 'popup_opened'}`}>
      <figure className="popup__figure">
        <button className="popup__close-btn popup__close-btn_img" type="button" onClick={onClose}></button>
        <img className="popup__img" alt={card.name} src={card.link}/>
        <figcaption className="popup__caption">
          <p className="popup__caption">{card.name}</p>
        </figcaption>  
      </figure>
    </section>
  );
}