import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Principal from './pages/principal'
import Nosotros from './pages/nosotros'
import Productos from './pages/productos'
import Contactos from './pages/contactos'
import Registro from './pages/registro'
import Login from './pages/login'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Principal/>}/>
        <Route path='/nosotros' element={<Nosotros/>}/>
        <Route path='/productos' element={<Productos/>}/>
        <Route path='/contactos' element={<Contactos/>}/>
        <Route path='/registro' element={<Registro/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
