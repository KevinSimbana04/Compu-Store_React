import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Principal from './pages/principal'
import Nosotros from './pages/nosotros'
import Productos from './pages/productos'
import Contactos from './pages/contactos'
import Registro from './pages/registro'
import Login from './pages/login'
import Dashboard from './layout/dashboard'
import Ventas from './layout/ventas'
import ProductosAdmin from './layout/productosAdmin'
import UsuariosAdmin from './layout/usuariosAdmin'
import Perfil from './layout/perfil'
import { CartProvider } from './context/CartContext';
import Carrito from './components/carrito';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Carrito />
        <Routes>
          <Route path='/' element={<Principal />} />
          <Route path='/nosotros' element={<Nosotros />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/contactos' element={<Contactos />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/ventas' element={<Ventas />} />
          <Route path='/admin/productos' element={<ProductosAdmin />} />
          <Route path='/admin/usuarios' element={<UsuariosAdmin />} />
          <Route path='/admin/perfil' element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
