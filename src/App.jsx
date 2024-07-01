import './App.css';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import Register from './Pages/Register';
import Upload from './Pages/Upload';
import Detalles from './Pages/Detalles';
import Perfil from './Pages/Perfil';
import Soporte from './Pages/Soporte';
import OlvidasteContra from './Pages/OlvidasteContra';
import MisVentas from './Pages/MisVentas';
import MisCompras from './Pages/MisCompras';
import CambiarContrasena from './Pages/CambiarContrasena';


function App() {
  return (
    <>
      <Routes>
        <Route path='*' element={<Login/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/dashboard' element={<Inicio/>}></Route>
        <Route path='/publicar' element={<Upload/>}></Route>
        <Route path='/perfil' element={<Perfil/>}></Route>
        <Route path='/misventas' element={<MisVentas/>}></Route>
        <Route path='/miscompras' element={<MisCompras/>}></Route>
        <Route path='/cambiar-contrasena/:userId/:token' element={<CambiarContrasena/>}></Route>
        <Route path='/soporte' element={<Soporte/>}></Route>
        <Route path='/olvidastecontra' element={<OlvidasteContra/>}></Route>
        <Route path='/dashboard/detalles/:id' element={<Detalles/>}></Route>
      </Routes>
    </>

  );
}

export default App;
