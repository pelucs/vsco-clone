import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './rotas/home/Home';
import Login from './rotas/login/Login';
import Cadastro from './rotas/cadastro/Cadastro';
import App from './rotas/app/AppVS';
import Perfil from './rotas/perfil/Perfil';
import Sobre from './rotas/sobre/Sobre';

const PrivateRoute = ({ children, redirectTo }) => {
  const isAutenticated = localStorage.getItem("key");
  return isAutenticated ? children : <Navigate to={ redirectTo }/>
}

export default () => {
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sobre" element={<Sobre/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/cadastro" element={<Cadastro/>}/>
      <Route path="/app" element={
        <PrivateRoute redirectTo="/login">
          <App/>
        </PrivateRoute> }/>
      <Route path="/app/perfil" element={
        <PrivateRoute redirectTo="/login">
          <Perfil/>
        </PrivateRoute>}/>
    </Routes>
  )
}