import { Link, Route, Routes } from 'react-router-dom';

export default function Header(props) {

  return (
    <header className="header">
      <div className="header__logo"></div>
      <Routes>
        <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>} />
        <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />
        <Route path="/" element={
          <div className="header__container">
            <div className="header__email">{props.email}</div>
            <Link to="/sign-in" className="header__link" style={{color: "#A9A9A9"}} onClick={props.onSignOut}>Выйти</Link>
          </div>
        } />
      </Routes>
    </header>
  );
}