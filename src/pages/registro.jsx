import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Home from "../assets/img/home-icono.png"
import Logo2 from "../assets/img/logo2.ico"
import { registrarUsuario } from '../services/authServices';

function Registro() {
    // Definición de estados
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cedula, setCedula] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await registrarUsuario(email, password, {
                nombre,
                apellido,
                cedula,
                fechaNacimiento,
                direccion
            });

            Swal.fire({
                icon: 'success',
                title: '¡Cuenta creada!',
                text: 'Te has registrado exitosamente. Bienvenido a Compu-Store.',
                confirmButtonColor: '#4391ff',
                timer: 2000
            }).then(() => {
                navigate('/dashboard');
            });

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error en el registro',
                text: error.message || 'No se pudo crear la cuenta. Inténtalo de nuevo.',
                confirmButtonColor: '#d33'
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-gradient-to-br from-[#5e7dff] to-[#85c9ff] min-h-screen flex flex-col justify-center items-center p-4 font-sans">

            {/* Botón Home - Flotante o en esquina */}
            <div className="w-full max-w-[800px] flex justify-end mb-4 z-10 transition-transform">
                <Link to="/">
                    <img src={Home} alt="Inicio" className="w-[50px] h-[50px] drop-shadow-lg hover:scale-110 transition-transform" title="Ir al Inicio" />
                </Link>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-[25px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] w-full max-w-[800px] animate-fade-in-up flex flex-col md:flex-row gap-8 items-center">

                {/* Columna Izquierda: Logo y Bienvenida */}
                <div className="hidden md:flex flex-col items-center justify-center w-1/3 text-center border-r border-gray-200 pr-8">
                    <div className="w-[120px] h-[120px] rounded-full bg-white flex items-center justify-center shadow-lg mb-6 animate-pulse p-2">
                        <img src={Logo2} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-[#333] text-2xl font-bold mb-2">Compu-Store</h2>
                    <p className="text-gray-500 text-sm">Crea tu cuenta para acceder a las mejores ofertas en tecnología.</p>
                </div>

                {/* Columna Derecha: Formulario */}
                <div className="w-full md:w-2/3">
                    <div className="text-center md:text-left mb-6">
                        <h2 className="text-[#333] text-2xl font-bold md:hidden mb-2">Crear Cuenta</h2>
                        <h2 className="text-[#333] text-3xl font-bold hidden md:block mb-1">Regístrate</h2>
                        <p className="text-[#666] text-sm">Completa tus datos personales</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Nombre */}
                            <div className="relative group">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">👤</span>
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    required
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                />
                            </div>
                            {/* Apellido */}
                            <div className="relative group">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">👤</span>
                                <input
                                    type="text"
                                    placeholder="Apellido"
                                    required
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Cédula */}
                            <div className="relative group">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">🆔</span>
                                <input
                                    type="text"
                                    placeholder="Cédula"
                                    required
                                    value={cedula}
                                    onChange={(e) => setCedula(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                />
                            </div>
                            {/* Fecha Nacimiento */}
                            <div className="relative group">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">📅</span>
                                <input
                                    type="date"
                                    required
                                    value={fechaNacimiento}
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-600"
                                />
                            </div>
                        </div>

                        {/* Dirección */}
                        <div className="relative group">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">🏠</span>
                            <input
                                type="text"
                                placeholder="Dirección completa"
                                required
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative group">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">📧</span>
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative group">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">🔒</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Contraseña"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                            <span
                                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer select-none text-xl"
                                onClick={togglePassword}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </span>
                        </div>

                        {/* Términos */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 ml-1">
                            <input type="checkbox" id="aceptarTerminos" required className="w-4 h-4 accent-blue-500 cursor-pointer rounded" />
                            <label htmlFor="aceptarTerminos">Acepto los <a href="#" className="text-blue-500 hover:underline font-semibold" onClick={(e) => e.preventDefault()}>términos y condiciones</a></label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 bg-[#4391ff] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-600 transition-all transform hover:-translate-y-0.5 flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : 'Registrarse'}
                        </button>
                    </form>

                    <div className="text-center text-gray-500 text-sm mt-6">
                        ¿Ya tienes cuenta? <Link to="/login" className="text-blue-500 font-bold cursor-pointer hover:text-blue-700 hover:underline">Inicia sesión aquí</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registro;