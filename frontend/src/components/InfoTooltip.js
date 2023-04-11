import {ReactComponent as SuccessIcon} from '../images/register-success-icon.svg';
import {ReactComponent as FailIcon} from '../images/register-fail-icon.svg';

export default function InfoTooltip(props) {

  const {isOpen, onClose, tooltipStatus} = props;

  return (
    <section className={`popup popup-tooltip ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-btn" type="button" onClick={onClose}></button>
        {tooltipStatus === 'success' ? <SuccessIcon /> : <FailIcon />}
        <h2 className="popup__title">{tooltipStatus === 'success' ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
      </div>
  </section>
  );
}