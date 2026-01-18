import { Link } from "react-router-dom"
import carrito from "../assets/carrito-logo.png"
import login from "../assets/img/login-icono.png"
import homei from "../assets/img/home-icono.png"
import productosi from "../assets/img/productos-icon.png"
import nosotrosi from "../assets/img/nosotros-icono.png"
import contactosi from "../assets/img/contacto-icono.png"

function Header(){
    return(
        <>
            <header className="bg-white sticky top-0 z-[1000] border-b border-[#cdcdcd] w-full flex flex-col h-auto">
                <div className="flex w-full md:w-[calc(100%-40px)] h-[100px] justify-between items-center px-8 mx-auto">
                    <div >
                        <Link  to="/" className="no-underline text-black">
                            <strong className="text-[50px] font-bold [text-shadow:0px_1.5px_3px_#5a5a5a]">COMPU-STORE</strong>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <input type="search" placeholder="Buscar productos..." 
                        className="w-[400px] lg:w-[600px] h-[50px] rounded-[20px] shadow-[0px_3px_4px_#fffdfd] border border-gray-200 px-6 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"></input>
                    </div>

                    <div className="flex gap-4 px-5">
                        <img src={login} alt="Login" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_3px_1.5px_#5a5a5a]"/>
                        <img src={carrito} alt="Carrito" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_3px_1.5px_#5a5a5a]"/>
                    </div>
                </div>

                <nav className="bg-[#111] py-4 w-full">
                    <ul className="flex flex-wrap justify-center items-center gap-6 md:gap-10 list-none m-0 p-0">
                        <li className="flex items-center gap-2 group">
                            <img src={homei} className="w-[35px] h-[35px] invert brightness-0"/>
                            <Link to={'/'} className="text-white text-lg no-underline relative transition-transform duration-300 group-hover:scale-110 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">Inicio</Link>
                        </li>
                        <li className="flex items-center gap-2 group">
                            <img src={productosi} className="w-[35px] h-[35px] invert brightness-0"/>
                            <Link to={'/productos'} className="text-white text-lg no-underline relative transition-transform duration-300 group-hover:scale-110 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">Productos</Link>
                        </li>
                        <li className="flex items-center gap-2 group">
                            <img src={nosotrosi} className="w-[32px] h-[30px] invert brightness-0"/>
                            <Link to={'/nosotros'} className="text-white text-lg no-underline relative transition-transform duration-300 group-hover:scale-110 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">Nosotros</Link>
                        </li>
                        <li className="flex items-center gap-2 group">
                            <img src={contactosi} className="w-[35px] h-[35px] invert brightness-0"/>
                            <Link to={'/contactos'} className="text-white text-lg no-underline relative transition-transform duration-300 group-hover:scale-110 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">Contacto</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
export default Header