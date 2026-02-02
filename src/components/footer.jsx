// Importación de iconos sociales
import facebook from "../assets/img/facebook.png"
import instagram from "../assets/img/instagram.png"
import x from "../assets/img/x.png"

// Componente Footer: Pie de página con enlaces y contacto
function Footer() {
    return (
        <>
            <footer className="bg-black py-12 px-4 text-white flex flex-wrap justify-evenly gap-8 border-t-2 border-[#333] w-full mt-10">

                <div className="min-w-[200px] max-w-[280px] text-center">
                    <h3 className="text-[22px] mb-4 [text-shadow:0px_2px_3px_#333] font-semibold">Síguenos en redes</h3>
                    <div className="flex justify-center gap-4">
                        <a href="https://www.facebook.com/" class="inline-block group">
                            <img src={facebook} alt="Facebook"
                                className="w-[45px] transition-all duration-300 drop-shadow-[0_3px_2px_#555] group-hover:scale-110 group-hover:drop-shadow-[0_4px_4px_#fff]" />
                        </a>
                        <a href="https://www.instagram.com/" class="inline-block group">
                            <img src={instagram} alt="Instagram"
                                className="w-[45px] transition-all duration-300 drop-shadow-[0_3px_2px_#555] group-hover:scale-110 group-hover:drop-shadow-[0_4px_4px_#fff]" />
                        </a>
                        <a href="https://x.com/" class="inline-block group">
                            <img src={x} alt="X"
                                className="w-[45px] transition-all duration-300 drop-shadow-[0_3px_2px_#555] group-hover:scale-110 group-hover:drop-shadow-[0_4px_4px_#fff]" />
                        </a>
                    </div>
                </div>

                <div className="min-w-[200px] max-w-[280px] text-center">
                    <h3 className="text-[22px] mb-4 [text-shadow:0px_2px_3px_#333] font-semibold">Enlaces de interés</h3>
                    <ul className="list-none p-0 space-y-2">
                        <li>
                            <a href="#" className="text-[#cdcdcd] no-underline relative transition-colors duration-300 hover:text-white group inline-block">
                                Aprovecha Nuestras ofertas
                                <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[#cdcdcd] no-underline relative transition-colors duration-300 hover:text-white group inline-block">
                                Preguntas frecuentes (FAQ)
                                <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[#cdcdcd] no-underline relative transition-colors duration-300 hover:text-white group inline-block">
                                Soporte técnico
                                <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="min-w-[200px] max-w-[280px] text-center">
                    <h3 className="text-[22px] mb-4 [text-shadow:0px_2px_3px_#333] font-semibold">Contáctanos</h3>
                    <p className="my-1 text-base"><strong>Teléfono:</strong> (593) 99 564 4186</p>
                    <p className="my-1 text-base"><strong>Email:</strong> ventas@compustore.com</p>
                </div>

                <div className="w-full text-center pt-4 text-sm border-t border-white/20 mt-4 opacity-80">
                    © Derechos Reservados - Compu-Store 2025
                </div>
            </footer>
        </>
    )
}
export default Footer