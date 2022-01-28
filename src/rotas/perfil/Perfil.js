import './Perfil.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contextAPI/AuthContext';
import { auth } from '../../Firebase';
 
import Header from '../../components/headerApp/HeaderApp';
import Footer from '../../components/footer/Footer';

export default () => {

  document.documentElement.scrollTop = 0;

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  //VERIFICAR EMAIL
  auth.languageCode = "pt";

  function verificarEmail(){
    let currentUser = auth.currentUser,
        aviso = document.getElementById("aviso");

    currentUser.sendEmailVerification()
    .then(() => {
      aviso.innerHTML = `Um email de verificação foi enviado para ${currentUser.email}`;
      aviso.style.color = "#06d6a0";
    }).catch(error => {
      aviso.innerHTML = error.message;
    });
  }

  //EXCLUIR CONTA
  function abrirModalExcluirConta(){
    document.querySelector(".modal-excluir-conta-container").classList.add("active-modal-excluir");
  }

  function closeModalExlcuirConta(){
    document.querySelector(".modal-excluir-conta-container").classList.remove("active-modal-excluir");
  }

  function activeButtonExlcuirConta(){
    let email = document.getElementById("email"),
        senha = document.getElementById("senha"),
        button = document.querySelector(".button-excluir button");

    if(email.value.length != 0 && senha.value.length != 0){
      button.classList.add("active-button-exlcuir");
    } else{
      button.classList.remove("active-button-exlcuir");
    }
  }

  function excluirConta(){
    let currentUser = auth.currentUser,
        email = document.getElementById("email"),
        senha = document.getElementById("senha");

    auth.signInWithEmailAndPassword(email.value, senha.value)
    .then(() => {
      currentUser.delete()
      .then(() => {
        localStorage.removeItem("key");
        navigate("/cadastro");
      }).catch(error => {
        alert(error.message);
      });
    }).catch(error => {
        alert(error.message);
    });
  }

  return(
    <div>
      <Header/>
      <div className="perfil-container">
        <p id="aviso" style={{ color: "#e63946" }}></p>
        <ul className="dados-box">
          {
            user ?
              <div>
                <li>
                  <h1>UserID:</h1>
                  <p>{user.uid}</p>
                </li>

                <li>
                  <h1>Nome:</h1>
                  <p>{user.displayName}</p>
                </li>

                <li>
                  <h1>Email:</h1>
                  <p>{user.email}</p>
                </li>

                <li>
                  <h1>Email verificado:</h1>
                  {
                    user.emailVerified ?
                      <p>Verificado</p>
                    :
                      <button onClick={verificarEmail}>Verificar Email</button>
                  }
                </li>

                <div className="delete-user-perfil">
                  <h1>Zona de Perigo</h1>
                  <button onClick={abrirModalExcluirConta}>Excluir conta</button>
                </div>
              </div>
            :
              <h1>Carregando...</h1>
          }
        </ul>

        <div className="modal-excluir-conta-container">
          <div className="modal-excluir-conta-box">
            <span onClick={closeModalExlcuirConta}><ion-icon name="close-circle"></ion-icon></span>
            <h1>Excluir conta</h1>
            <div className="button-excluir">
              <p>Essa ação não é reversível. Ao excluir a conta você terá que cadastrar um novo usuário</p>
              <input onChange={activeButtonExlcuirConta} type="text" placeholder="Email" id="email" autoComplete="off"/>
              <input onChange={activeButtonExlcuirConta} type="password" placeholder="Senha" id="senha"/>
              <button onClick={excluirConta}>Excluir conta</button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}