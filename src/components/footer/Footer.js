import './Footer.css';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="footer-container">
      <div className="links-footer-container">
        <ul className="links-footer-box">
          <h1>Instituição</h1>
          <li><Link to="/sobre">Sobre</Link></li>
          <li><a href="#">Carreiras</a></li>
        </ul>

        <ul className="links-footer-box">
          <h1>Comunidade</h1>
          <li><a href="#">Diretrizes</a></li>
          <li><a href="#">Suporte</a></li>
          <li><a href="#">Comunidade</a></li>
          <li><a href="#">Resgatar</a></li>
        </ul>

        <ul className="links-footer-box">
          <h1>Legal</h1>
          <li><a href="#">Privacidade</a></li>
          <li><a href="#">Termos</a></li>
          <li><a href="#">Cookies</a></li>
        </ul>

        <ul className="links-footer-box">
          <h1>Contatos</h1>
          <li><a href="mailto:pedro.lucs0089@gmail.com">Email</a></li>
          <li><a href="https://www.instagram.com/pe.lucs">Instagram</a></li>
          <li><a href="https://www.linkedin.com/in/pedro-lucas-083/">Linkedin</a></li>
        </ul>
      </div>

      <div className="copy-box">
        <p>&copy; VSCO 2022 - Todos os direitos reservados</p>
      </div>
    </div>
  )
}