import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register(props) {

  const { onSubmit } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({email, password});
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__container">
        <h1 className="form__title form__title_color_white">Регистрация</h1>
        <input className="form__input form__input_theme_white" value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" minLength="2" maxLength="40" required />
        <span className="form__error form__error_size_l form-error-email"></span>
        <input className="form__input form__input_theme_white" value={password} onChange={(e) => setPassword(e.target.value)} type="password"  name="password" placeholder="Пароль" minLength="2" maxLength="40" required />
        <span className="form__error form__error_size_l form-error-password"></span>
        <button className="form__sub-btn form__sub-btn_color_white" type="submit">Зарегистрироваться</button>
        <Link to="/sign-in" className="form__link">Уже зарегистрированы? Войти</Link>
      </div>
    </form>
  )
}