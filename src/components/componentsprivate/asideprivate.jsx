import React from 'react';
import nosotrosi from "../../assets/img/nosotros-icono.png"
import Logo2 from "../../assets/img/logo2.ico"
import HomeIcon from "../../assets/img/home-icono.png"
import ProductsIcon from "../../assets/img/productos-icon.png"
import SalesIcon from "../../assets/img/ventas.png"


// Estado que controla si el menú es visible en móviles.
// Función para cerrar el menú (usada en el overlay).

const AsidePrivate = ({ isOpen, onClose }) => {
    return (
        <>
            {/* 1. Fondo oscuro (Overlay) para cerrar el menú en móviles */}
            <div
                id="menuOverlay"
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[1050] md:hidden transition-opacity ${isOpen ? 'block' : 'hidden'}`}
                onClick={onClose}
            ></div>

            {/* 2. Menú Lateral (Sidebar) */}
            <aside
                id="sidebar"
                className={`fixed top-0 left-0 h-full w-[200px] bg-[#111] text-white z-[1100] transition-transform duration-300 transform 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                <div className="h-[100px] flex items-center justify-center bg-[#111]">
                    <img src={Logo2} alt="Logo Compu-Store" className="w-[80px] h-[80px] drop-shadow-md" />
                </div>

                <nav className="mt-10">
                    <ul className="list-none p-0 m-0">
                        {/* Opción Dashboard */}
                        <li className="group">
                            <a
                                href="/dashboard"
                                className="flex items-center gap-3 px-6 py-4 hover:bg-blue-600 transition-colors"
                            >
                                <img src={HomeIcon} className="w-6 h-6 invert brightness-0" alt="Dashboard" />
                                <span>Dashboard</span>
                            </a>
                        </li>

                        {/* Opción Productos */}
                        <li className="group">
                            <a
                                href="/admin/productos"
                                className="flex items-center gap-3 px-6 py-4 hover:bg-blue-600 transition-colors"
                            >
                                <img src={ProductsIcon} className="w-6 h-6 invert brightness-0" alt="Productos" />
                                <span>Productos</span>
                            </a>
                        </li>

                        {/* Opción Ventas */}
                        <li className="group">
                            <a
                                href="/ventas"
                                className="flex items-center gap-3 px-6 py-4 hover:bg-blue-600 transition-colors"
                            >
                                <img src={SalesIcon} className="w-6 h-6 invert brightness-0" alt="Ventas" />
                                <span>Ventas</span>
                            </a>
                        </li>

                        {/* Opción Usuarios */}
                        <li className="group">
                            <a
                                href="/admin/usuarios"
                                className="flex items-center gap-3 px-6 py-4 hover:bg-blue-600 transition-colors"
                            >
                                <img src={nosotrosi} className="w-[32px] h-[30px] invert brightness-0" />
                                <span>Usuarios</span>
                            </a>
                        </li>

                        {/* Opción Perfil */}
                        <li className="group">
                            <a
                                href="/admin/perfil"
                                className="flex items-center gap-3 px-6 py-4 hover:bg-blue-600 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                <span>Mi Perfil</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default AsidePrivate;