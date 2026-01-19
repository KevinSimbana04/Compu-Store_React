import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Home from "../assets/img/home-icono.png"
import Logo2 from "../assets/img/logo2.ico"
function Registro  (){
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);

        const handleRegistro = (e) => {
        e.preventDefault();
        // Lógica de registro
        alert('Registro', 'Cuenta creada exitosamente', 'success');
    };

    return (
        <div className="bg-gradient-to-br from-[#5e7dff] to-[#85c9ff] min-h-screen flex flex-col justify-center items-center p-4">
            
            {/* Botón Home */}
            <div className="w-full max-w-[450px] flex justify-end mb-4">
                <Link to="/">
                    <img src= {Home} alt="casa" className="w-[50px] h-[50px]" />
                </Link>
            </div>

            <div className="bg-white/95 backdrop-blur-md p-10 rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-full max-w-[450px] animate-fade-in-up">
                <div className="text-center mb-6">
                    <div className="w-[100px] h-[100px] rounded-full bg-white mx-auto mb-4 flex items-center justify-center shadow-[0_10px_25px_rgba(57,57,57,0.4)] animate-pulse">
                        <img src={Logo2} alt="logo" className="w-[80px] h-[80px]" />
                    </div>
                    <h2 className="text-[#333] text-2xl font-bold mb-1">Crear Cuenta</h2>
                    <p className="text-[#666] text-sm">Únete a nuestra comunidad</p>
                </div>

                <form className="space-y-3" onSubmit={handleRegistro}>
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">👤</span>
                            <input type="text" placeholder="Nombre" required className="w-full pl-10 pr-4 py-3 border-2 border-[#e0e0e0] rounded-[10px] focus:outline-none focus:border-[#5070ff]" />
                        </div>
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">👤</span>
                            <input type="text" placeholder="Apellido" required className="w-full pl-10 pr-4 py-3 border-2 border-[#e0e0e0] rounded-[10px] focus:outline-none focus:border-[#5070ff]" />
                        </div>
                    </div>

                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2">🆔</span>
                        <input type="text" placeholder="Cédula" required className="w-full pl-12 pr-4 py-3 border-2 border-[#e0e0e0] rounded-[10px] focus:outline-none focus:border-[#5070ff]" />
                    </div>

                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2">📅</span>
                        <input type="date" required className="w-full pl-12 pr-4 py-3 border-2 border-[#e0e0e0] rounded-[10px] focus:outline-none focus:border-[#5070ff]" />
                    </div>

                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2">📧</span>
                        <input type="email" placeholder="Correo electrónico" required className="w-full pl-12 pr-4 py-3 border-2 border-[#e0e0e0] rounded-[10px] focus:outline-none focus:border-[#5070ff]" />
                    </div>

                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2">🏠</span>
                        <input type="text" placeholder="Dirección" required className="w-full pl-12 pr-4 py-3 border-2 border-[#e0e0e0] rounded-[10px] focus:outline-none focus:border-[#5070ff]" />
                    </div>

                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2">🔒</span>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Contraseña" 
                            required 
                            className="w-full pl-12 pr-12 py-3 border-2 border-[#e0e0e0] rounded-[10px] focus:outline-none focus:border-[#5070ff]" 
                        />
                        <span 
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-lg" 
                            onClick={togglePassword}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#666]">
                        <input type="checkbox" id="aceptarTerminos" required className="w-[18px] h-[18px] accent-[#5070ff] cursor-pointer" />
                        <label htmlFor="aceptarTerminos">Acepto los <a href="#" className="text-[#667eea] hover:underline" onClick={(e) => e.preventDefault()}>términos y condiciones</a></label>
                    </div>

                    <button type="submit" className="w-full py-4 bg-[#4391ff] text-white font-semibold rounded-[10px] shadow-lg hover:-translate-y-0.5 transition-all">
                        Crear Cuenta
                    </button>
                </form>

                <div className="text-center text-[#666] text-sm mt-6">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-[#667eea] font-bold cursor-pointer hover:text-[#764ba2]">Inicia sesión</Link>
                </div>
            </div>
        </div>
    );
};

export default Registro;