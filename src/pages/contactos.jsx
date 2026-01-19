import Header from "../components/header"
import Footer from "../components/footer"

function Contactos(){
    const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire('¡Enviado!', 'Gracias por escribirnos. Te contactaremos pronto.', 'success');
    
    };
    return(
        <>
        <Header/>
<div className="flex-grow pt-[120px] pb-10 px-4 flex items-center justify-center min-h-screen bg-gray-50">
      
      <div className="max-w-6xl w-full bg-white rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row animate-fade-in-up">
        
        {/* Sección Izquierda: Información y Mapa */}
        <div className="md:w-1/2 bg-[#4391ff] p-10 text-white flex flex-col justify-between relative overflow-hidden">
            
          {/* Decoración de fondo */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-black opacity-10 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ponte en contacto</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              ¿Tienes dudas sobre qué PC armar o necesitas soporte técnico? 
              Envíanos un mensaje y nuestros expertos te responderán en menos de 24 horas.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📍</div>
                <div>
                  <p className="font-bold text-sm opacity-80">UBICACIÓN</p>
                  <p>Av. Universitaria, Quito - Ecuador</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📞</div>
                <div>
                  <p className="font-bold text-sm opacity-80">TELÉFONO</p>
                  <p>+(593) 99 564 4186</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📧</div>
                <div>
                  <p className="font-bold text-sm opacity-80">CORREO</p>
                  <p>ventas@compustore.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 relative z-10 rounded-xl overflow-hidden shadow-lg border-2 border-white/30 h-[220px] group">
            <iframe 
              src="https://maps.google.com/maps?q=Av.+Universitaria,+Quito&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="group-hover:scale-105 transition-transform duration-700"
              title="Google Maps"
            ></iframe>
          </div>
        </div>

        {/* Sección Derecha: Formulario */}
        <div className="md:w-1/2 p-10 bg-white">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Envíanos un mensaje 🚀</h3>
              <p className="text-gray-500 text-sm mt-1">Completa el formulario a continuación</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre</label>
                <input type="text" className="w-full bg-gray-50 border-2 border-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all hover:bg-white" placeholder="Nombre" required />
              </div>
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-1">Apellido</label>
                <input type="text" className="w-full bg-gray-50 border-2 border-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all hover:bg-white" placeholder="Apellido" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
              <input type="email" className="w-full bg-gray-50 border-2 border-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all hover:bg-white" placeholder="correo" required />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Mensaje</label>
              <textarea rows="4" className="w-full bg-gray-50 border-2 border-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all hover:bg-white resize-none" placeholder="Cuéntanos, ¿en qué podemos ayudarte hoy?" required></textarea>
            </div>

            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-bold rounded-xl text-lg px-5 py-4 text-center shadow-lg hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-2">
              <span>Enviar Mensaje</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
        <Footer/>
        </>
    )
}

export default Contactos