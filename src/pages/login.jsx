import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Home from '../assets/img/home-icono.png';
import Logo2 from '../assets/img/logo2.ico';
import { iniciarSesion } from '../Services/authServices';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await iniciarSesion(email, password);
            Swal.fire({
                icon: 'success',
                title: '¡Bienvenido!',
                text: 'Has iniciado sesión correctamente',
                timer: 1500,
                showConfirmButton: false
            });
            navigate('/dashboard');
        } catch (error) {
            console.error("Error en login:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Credenciales incorrectas o error en el servidor',
                confirmButtonColor: '#4391ff'
            });
        }
    };

    return (
        <div className="bg-gradient-to-br from-[#5e7dff] to-[#85c9ff] min-h-screen flex flex-col justify-center items-center p-4">

            {/* Botón Home */}
            <div className="w-full max-w-[450px] flex justify-end mb-4 hover:drop-shadow-[2px_2px_5px_rgba(181,181,181,1)] transition-all">
                <Link to="/">
                    <img src={Home} alt="casa" className="w-[50px] h-[50px]" />
                </Link>
            </div>

            <div className="bg-white/95 backdrop-blur-md p-10 rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-full max-w-[450px] animate-fade-in-up">

                {/* Encabezado Logo */}
                <div className="text-center mb-8">
                    <div className="w-[100px] h-[100px] rounded-full bg-white mx-auto mb-4 flex items-center justify-center shadow-[0_10px_25px_rgba(57,57,57,0.4)] animate-pulse">
                        <img src={Logo2} alt="logo" className="w-[80px] h-[80px]" />
                    </div>
                    <h2 className="text-[#333] text-2xl font-bold mb-2">Bienvenido COMPU-STORE</h2>
                    <p className="text-[#666] text-sm">Ingresa a tu cuenta</p>
                </div>

                {/* Formulario */}
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">👨‍💻</span>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 border-[#e0e0e0] rounded-[10px] focus:outline-none focus:border-[#5070ff] focus:ring-4 focus:ring-[#667eea1a] transition-all"
                        />
                    </div>

                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔒</span>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-12 py-4 border-2 border-[#e0e0e0] rounded-[10px] focus:outline-none focus:border-[#5070ff] focus:ring-4 focus:ring-[#667eea1a] transition-all"
                        />
                        <span
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer select-none text-lg"
                            onClick={togglePassword}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </span>
                    </div>

                    <div className="text-right">
                        <a href="#" className="text-[#667eea] text-sm hover:underline" onClick={(e) => e.preventDefault()}>¿Olvidaste tu contraseña?</a>
                    </div>

                    <button type="submit" className="w-full py-4 bg-[#4391ff] text-white font-semibold rounded-[10px] shadow-[0_4px_15px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 hover:shadow-xl transition-all">
                        Iniciar Sesión
                    </button>
                </form>


                <div className="text-center text-[#666] text-sm">
                    ¿No tienes cuenta? <Link to="/registro" className="text-[#667eea] font-bold cursor-pointer hover:text-[#764ba2]">Regístrate aquí</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;