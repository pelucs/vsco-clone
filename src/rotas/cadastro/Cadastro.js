import './Cadastro.css';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase';

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

  //ANIMAÇÃO BUTTON
  function activeButton(){
    let nome = document.getElementById("nome"),
        sobrenome = document.getElementById("sobrenome"),
        email = document.getElementById("email"),
        emailconfirm = document.getElementById("emailconfirm"),
        senha = document.getElementById("senha"),
        senhaconfirm = document.getElementById("senhaconfirm"),
        button = document.querySelector(".buttons-box button");

    if(nome.value.length != 0 && sobrenome.value.length != 0 && email.value.length != 0 && emailconfirm.value.length != 0 && senha.value.length != 0 && senhaconfirm.value.length != 0){
      button.classList.add("active-button");
    } else{
      button.classList.remove("active-button");
    }
  }

  //CADASTRO USUÁRIO
  function cadastrarUser(){
    let nome = document.getElementById("nome"),
        sobrenome = document.getElementById("sobrenome"),
        email = document.getElementById("email"),
        emailconfirm = document.getElementById("emailconfirm"),
        senha = document.getElementById("senha"),
        senhaconfirm = document.getElementById("senhaconfirm"),
        avisoCadastro = document.getElementById("avisoCadastro");

    if(nome.value.length != 0 && sobrenome.value.length != 0 && email.value.length != 0 && emailconfirm.value.length != 0 && senha.value.length != 0 && senhaconfirm.value.length != 0){
      if(email.value == emailconfirm.value && senha.value == senhaconfirm.value){
        
        auth.createUserWithEmailAndPassword(email.value, senha.value)
        .then(AuthUser => {
          AuthUser.user.updateProfile({
            displayName: `${nome.value} ${sobrenome.value}`
          });

          avisoCadastro.innerHTML = "Cadastrado efetuado com sucesso. Faça seu login";
          avisoCadastro.style.color = "#06d6a0";

          nome.value = "";
          sobrenome.value = "";
          email.value = "";
          emailconfirm.value = "";
          senha.value = "";
          senhaconfirm.value = "";
        })
        .catch(error => {
          avisoCadastro.innerHTML = error.message;
        });
      } else{
        avisoCadastro.innerHTML = "*Email ou senha estão incorretos. Certifique-se de que estão iguais";
      }
    } else{
      avisoCadastro.innerHTML = "*Preencha todos os campos corretamente";
    }
  }

  return(
    <div>
      <Header/>
      <div className="cadastro-container">
        <div className="box-auth">
          <h1>Faça o cadastro para criar, descobrir e conectar com a comunidade global.</h1>
          <p id="avisoCadastro" style={{ color: "#e63946", margin: "5px 0" }}></p>
          <div className="inputs-box">
            <input onChange={activeButton} type="text" placeholder="Nome" id="nome"/>
            <input onChange={activeButton} type="text" placeholder="Sobrenome" id="sobrenome"/>
            <input onChange={activeButton} type="email" placeholder="Email" id="email"/>
            <input onChange={activeButton} type="email" placeholder="Confirme o email" id="emailconfirm"/>
            <input onChange={activeButton} type="password" placeholder="Senha" id="senha"/>
            <input onChange={activeButton} type="password" placeholder="Confirme a senha" id="senhaconfirm"/>
          </div>
          <p>Aceito todos os <a href="#">Termos</a> e <a href="#">Políticas de Privacidade</a></p>
          <div className="buttons-box">
            <div className="buttons">
              <Link to="/login">Fazer Login</Link>
            </div>
            <button onClick={cadastrarUser}>Cadastrar</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}