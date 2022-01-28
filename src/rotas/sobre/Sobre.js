import './Sobre.css';
import { useContext } from 'react';
import { AuthContext } from '../../contextAPI/AuthContext';
import { Link } from 'react-router-dom';

import Header from '../../components/header/Header';
import HeaderApp from '../../components/headerApp/HeaderApp';
import Footer from '../../components/footer/Footer';

export default () => {

  document.documentElement.scrollTop = 0;

  const { user, setUser } = useContext(AuthContext);

  return(
    <div>
      {
        user ? 
          <HeaderApp/>
        :
          <Header/>
      }
      <div className="sobre-container">
        <h1>Sobre</h1>
        <div className="sobre-box">
          <p>Olá, me chamo Pedro Lucas, tenho 19 anos e moro em Campina Grande na Paraíba. Decidi fazer este projeto que imita basicamente as funcionalidades e design do app original <a target="_blank" href="https://vsco.co/">VSCO</a>, declarando todos os direitos de imagens a empresa. Meu objetivo com esse projeto é demostrar os meus conhecimentos com as tecnologias HTML, CSS, JavaScript, ReactJs e Firebase. Esta aplicação contêm sistema de autenticação com rotas privadas e sistema de post de images no feed. <Link to="/cadastro">Crie uma conta</Link> ou <Link to="/login">faça seu login</Link> para desfrutar das funcionalidades do projeto. Espero que goste e até mais.</p>
        </div>
        
        <h1>Entre em contato</h1>
        <ul className="sobre-box sobre-sociais">
          <li><a href="mailto:pedro.lucs0089@gmail.com"><ion-icon name="mail-outline"></ion-icon></a></li>
          <li><a target="_blank" href="https://www.instagram.com/pe.lucs"><ion-icon name="logo-instagram"></ion-icon></a></li>
          <li><a target="_blank" href="https://www.linkedin.com/in/pedro-lucas-083/"><ion-icon name="logo-linkedin"></ion-icon></a></li>
          <li><a target="_blank" href="https://github.com/pelucs"><ion-icon name="logo-github"></ion-icon></a></li>
        </ul>
      </div>
      <Footer/>
    </div>
  )
}