import './Header.css';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.png';

export default () => {

  //MENU HAMB
  function menuHamb(){
    document.querySelector(".menu-hamb-links").classList.toggle("active-menu");
    document.querySelector(".menu-hamb").classList.toggle("active-menu-hamb");
  }

  return(
    <div className="header-container">
      <div className="search-box">
        <span><ion-icon name="search-outline"></ion-icon></span>
      </div>

      <div className="logo-box">
        <Link to="/"><img src={logo} alt="Logo"/></Link>
      </div>

      <ul className="menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/sobre">Sobre</Link></li>
        <li><Link to="/login">Entrar</Link></li>
        <li><Link to="/cadastro">Cadastrar</Link></li>
      </ul>

      <div className="menu-hamb" onClick={menuHamb}></div>
      <div className="menu-hamb-links">
        <ul className="menu-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          <li><Link to="/login">Entrar</Link></li>
          <li><Link to="/cadastro">Cadastrar</Link></li>
        </ul>

        <hr></hr>

        <ul className="social-menu-box">
          <li><a target="_blank" href="https://www.instagram.com/pe.lucs"><ion-icon name="logo-instagram"></ion-icon></a></li>
          <li><a target="_blank" href="https://www.linkedin.com/in/pedro-lucas-083/"><ion-icon name="logo-linkedin"></ion-icon></a></li>
          <li><a target="_blank" href="https://github.com/pelucs"><ion-icon name="logo-github"></ion-icon></a></li>
        </ul>
      </div>
    </div>
  )
}