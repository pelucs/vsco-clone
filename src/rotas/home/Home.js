import './Home.css';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

export default () => {

  document.documentElement.scrollTop = 0;

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("key")){
      navigate("/app");
    }
  }, []);

  //MODAL AVISO
  window.addEventListener("load", () => {
    document.querySelector(".aviso-creditos").classList.add("active-modal-aviso");
  });

  function closModalAviso(){
    document.querySelector(".aviso-creditos").classList.remove("active-modal-aviso");
  }

  return(
    <div>
      <Header/>
      <div className="home-container">
        <div className="content-1">
          <h1>Onde A Expressão é Mais Importante.</h1>
          <Link to="/cadastro">Cadastre-se</Link>
          <a target="_blank" href="https://www.pexels.com/pt-br/foto/maos-de-pessoas-se-alcancando-5541019/">Foto de fundo</a>
        </div>

        <div className="aviso-creditos">
          <span onClick={closModalAviso}><ion-icon name="close-circle"></ion-icon></span>
          <h1><ion-icon name="alert-circle-outline"></ion-icon> Aviso</h1>
          <p>Declaro todos os diretos de imagens para seus respectivos proprietários. Acesse a página <Link to="/sobre">Sobre</Link> para saber mais sobre o projeto.</p>
        </div>
      </div>
      <Footer/>
    </div>
  )
}