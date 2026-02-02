import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { auth } from '../../firebase/firebase';
import { obtenerPerfilUsuario } from '../../Services/authServices';

const HeaderPrivate = ({ onToggleMenu }) => {
    const [userData, setUserData] = useState({ nombre: 'Usuario', rol: 'Administrador' });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const profile = await obtenerPerfilUsuario(user.uid);
                    if (profile) {
                        setUserData({
                            nombre: `${profile.nombre} ${profile.apellido}`,
                            rol: profile.rol === 'admin' ? 'Administrador' : profile.rol || 'Administrador'
                        });
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                }
            }
        });
        return () => unsubscribe();
    }, []);

    // Lógica para el botón "Salir" con SweetAlert2
    const handleLogout = () => {
        Swal.fire({
            title: '¿Cerrar sesión?',
            text: "Serás redirigido a la página de inicio",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6', // Color azul de tu botón
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirección al inicio
                window.location.href = "/";
            }
        });
    };

    return (
        <header className="bg-[#111] text-white h-[100px] flex items-center justify-between px-5 fixed top-0 left-0 md:left-[200px] w-full md:w-[calc(100%-200px)] z-[1000] transition-all duration-300 border-b border-gray-800">

            {/* Botón Hamburguesa para móviles */}
            <button
                className="md:hidden text-3xl bg-transparent text-white border-none cursor-pointer p-2"
                onClick={onToggleMenu}
            >
                &#9776;
            </button>

            <div className="text-2xl md:text-[35px] font-bold">
                <strong>COMPU-STORE</strong>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
                <div className="hidden sm:flex flex-col text-right">
                    <span className="font-semibold text-sm">{userData.nombre}</span>
                    <span className="text-xs text-gray-400 capitalize">{userData.rol}</span>
                </div>
                <button
                    id="btnSalir"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-4 rounded-md transition-colors"
                    onClick={handleLogout}
                >
                    Salir
                </button>
            </div>
        </header>
    );
};

export default HeaderPrivate;