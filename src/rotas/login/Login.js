import './Login.css';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { auth } from '../../Firebase';

export default () => {

  document.documentElement.scrollTop = 0;

  //VALIDAÇÃO SE EXISTE USUÁRIO
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("key")){
      navigate("/app");
    }
  }, []);

  //ANIMAÇÃO BUTTON
  function activeButton(){
    let email = document.getElementById("email"),
      senha = document.getElementById("senha"),
      button = document.querySelector(".buttons-box button");

    if(email.value.length != 0 && senha.value.length != 0){
      button.classList.add("active-button");
    } else{
      button.classList.remove("active-button");
    }
  }

  //FAZER LOGIN
  function loginUser(){
    let email = document.getElementById("email"),
        senha = document.getElementById("senha"),
        avisoLogin = document.getElementById("avisoLogin");

    if(email.value.length != 0 && senha.value.length != 0){
      
      auth.signInWithEmailAndPassword(email.value, senha.value)
      .then(() => {
        localStorage.setItem("key", Math.floor(Math.random() * 3000));
        navigate("/app");

        avisoLogin.innerHTML = "Login efetuado com sucesso";
        avisoLogin.style.color = "#06d6a0";
      }).catch(error => {
        avisoLogin.innerHTML = "Email/Senha está(ão) incorreto(s)";
      });
    } else{
      avisoLogin.innerHTML = "*Preencha todos os campos corretamente";
    }
  }

  return (
    <div>
      <Header/>
      <div className="login-container">
        <div className="box-auth">
          <h1>Faça login para criar, descobrir e conectar com a comunidade global.</h1>
          <p id="avisoLogin" style={{ color: "#e63946", margin: "10px 0" }}></p>
          <div className="inputs-box">
            <input onChange={activeButton} type="email" placeholder="Email" id="email"/>
            <input onChange={activeButton} type="password" placeholder="Senha" id="senha"/>
          </div>
          <p>Aceito todos os <a href="#">Termos</a> e <a href="#">Políticas de Privacidade</a></p>
          <div className="buttons-box">
            <div className="buttons">
              <Link to="/cadastro">Fazer Cadastro</Link>
              <span>Esqueceu a senha?</span>
            </div>
            <button onClick={loginUser}>Logar</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}