import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de tener instalado react-router-dom
// Opcional, si usas SweetAlert
import Home from "../assets/img/home-icono.png"
import Logo2 from "../assets/img/logo2.ico"

function Login  () {

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí iría tu lógica de autenticación
    alert('Login', 'Iniciando sesión...', 'info');
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
                  type="text" 
                  placeholder="Usuario" 
                  required 
                  className="w-full pl-12 pr-4 py-4 border-2 border-[#e0e0e0] rounded-[10px] focus:outline-none focus:border-[#5070ff] focus:ring-4 focus:ring-[#667eea1a] transition-all" 
                />
            </div>

            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔒</span>
                <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Contraseña" 
                    required 
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

        <div className="text-center my-6 relative">
            <span className="bg-white px-4 text-[#999] text-sm relative z-10">o continúa con</span>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#e0e0e0]"></div>
        </div>

        <div className="flex gap-4 mb-6">
            <button className="flex-1 py-3 border-2 border-[#e0e0e0] rounded-[10px] flex justify-center hover:border-[#4285F4] hover:-translate-y-0.5 hover:shadow-md transition-all">
                <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
            </button>
            <button className="flex-1 py-3 border-2 border-[#e0e0e0] rounded-[10px] flex justify-center hover:border-[#1877F2] hover:-translate-y-0.5 hover:shadow-md transition-all">
                <img src="https://www.facebook.com/favicon.ico" className="w-5 h-5" alt="Facebook" />
            </button>
        </div>

        <div className="text-center text-[#666] text-sm">
            ¿No tienes cuenta? <Link to="/registro" className="text-[#667eea] font-bold cursor-pointer hover:text-[#764ba2]">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;