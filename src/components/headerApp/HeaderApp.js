import './HeaderApp.css';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, database, firebase } from '../../Firebase';
import { AuthContext } from '../../contextAPI/AuthContext';

import logo from '../../images/logo.png';

export default () => {

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ file, setFile ] = useState();

  //MENU USER
  function menuApp(){
    document.querySelector(".menu-app").classList.toggle("active-menu-user");
  }

  //MODAL POSTAGEM
  function modalPostagem(e){
    e.preventDefault();

    document.querySelector(".modal-postagem-container").classList.add("active-modal-postagem");
    document.querySelector(".menu-app").classList.remove("active-menu-user");
  }

  function closeModalPostagem(){
    document.querySelector(".modal-postagem-container").classList.remove("active-modal-postagem");
  }

  function backModal(){
    let boxSelectImage = document.querySelector(".modal-postagem-box"),
        boxUploadImage = document.querySelector(".modal-upload-post");

    boxSelectImage.style.display = "block";
    boxUploadImage.style.display = "none";
  }

  function changeUpload(e){
    let file = e.target.files[0],
        boxSelectImage = document.querySelector(".modal-postagem-box"),
        boxUploadImage = document.querySelector(".modal-upload-post"),
        img = document.querySelector(".img-box-post img");

    setFile(file);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      img.src = e.target.result;
    }

    boxSelectImage.style.display = "none";
    boxUploadImage.style.display = "flex";
  }

  function postarFoto(){
    let descricao = document.getElementById("descricao").value;

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      database.collection("posts").add({
        userName: user.displayName,
        descricao: descricao,
        curtidas: 0,
        image: e.target.result,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        document.querySelector(".modal-postagem-container").classList.remove("active-modal-postagem");
        document.querySelector(".modal-postagem-box").style.display = "block";
        document.querySelector(".modal-upload-post").style.display = "none";
        document.getElementById("descricao").value = "";
      })
      .catch(error => {
        alert(error.message);
      })
    }
  }

  //SAIR DA CONTA
  function logOutUser(e){
    e.preventDefault();

    auth.signOut()
    .then(() => {
      localStorage.removeItem("key");
      navigate("/login");
    }).catch(error => {
      alert(error.message);
    });
  }

  function maxLength(){
    let descricao = document.getElementById("descricao").value,
        aviso = document.getElementById("aviso");

    if(descricao.length == 50){
      aviso.style.display = "block";
    } else {
      aviso.style.display = "none";
    }
  }

  return(
    <div className="headerApp-container">
        <div className="search-box">
          <span><ion-icon name="search-outline"></ion-icon></span>
        </div> 

      <div className="logo-box">
        <img src={logo} alt="Logo"/>
      </div>

      <div className="menu-user">
        <span onClick={menuApp}><ion-icon name="person-circle-outline"></ion-icon></span>
        <p onClick={menuApp}>Minha conta</p>

        <ul className="menu-app">
          <li><Link to="/app"><ion-icon name="home-outline"></ion-icon> Home</Link></li>
          <li><Link to="/app/perfil"><ion-icon name="person-outline"></ion-icon> Perfil</Link></li>
          <li onClick={modalPostagem}><a href="#"><ion-icon name="add-circle-outline"></ion-icon> Nova postagem</a></li>
          <li onClick={logOutUser}><a href="#"><ion-icon name="log-out-outline"></ion-icon> Sair</a></li>
        </ul>
      </div>

      <div className="modal-postagem-container">
        <form className="modal-postagem-box">
          <span onClick={closeModalPostagem}><ion-icon name="close-circle"></ion-icon></span>
          <h1>Fazer uma nova postagem</h1>
          <div className="button-postar">
            <span><ion-icon name="images-outline"></ion-icon></span>
            <input onChange={changeUpload} type="file" id="file" accept="images/*"/>
            <label htmlFor="file">Selecionar arquivo</label>
          </div>
        </form>

        <div className="modal-upload-post">
          <div onClick={backModal} className="back-modal"><ion-icon name="arrow-back-outline"></ion-icon></div>
          <span onClick={closeModalPostagem}><ion-icon name="close-circle"></ion-icon></span>
          <h1>Fazer uma nova postagem</h1>
          <div className="img-box-post">
            <img src="" alt="Imagem"/>
          </div>
          <input type="text" placeholder="Descrição" id="descricao" autoComplete="off" maxLength="50" onChange={maxLength}/>
          <p id="aviso">Máximo de caracteres atingito</p>
          <button onClick={postarFoto}>Postar</button>
        </div>
      </div>
    </div>
  )
}