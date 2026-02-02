// Importación de hooks y assets
import { useState, useEffect } from 'react'
import banner1 from "../assets/img/banner1.jpg"
import banner2 from "../assets/img/banner2.jpg"
import laptop from "../assets/img/laptopcate1.png"
import cpu from "../assets/img/cpupcate2.png"
import impresora from "../assets/img/imprecate2.png"
import proyector from "../assets/img/proyecate3.png"
import consola from "../assets/img/consocate4.png"
import { Link } from 'react-router-dom'

// Componente Carrusel: Slider de imágenes para el inicio
function Carrusel() {
    // Estado para controlar el índice de la imagen actual
    const [currentIndex, setCurrentIndex] = useState(0);
    const banners = [banner1, banner2];

    // Función para retroceder a la imagen anterior
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? banners.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    // Función para avanzar a la siguiente imagen
    const nextSlide = () => {
        const isLastSlide = currentIndex === banners.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // Efecto para el cambio automático de diapositivas
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Cambio automático cada 5 segundos
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <>
            <main className="relative w-full h-[250px] md:h-[350px] lg:h-[450px] overflow-hidden group">
                <div
                    id="slider"
                    className="flex w-full h-full transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {banners.map((banner, index) => (
                        <div key={index} className="min-w-full h-full flex-shrink-0">
                            <img src={banner} className="w-full h-full object-cover" alt={`Banner ${index + 1}`} />
                        </div>
                    ))}
                </div>

                {/* Left Arrow */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                {/* Right Arrow */}
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>

                {/* Dots/Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {banners.map((_, slideIndex) => (
                        <div
                            key={slideIndex}
                            onClick={() => setCurrentIndex(slideIndex)}
                            className={`transition-all w-3 h-3 rounded-full cursor-pointer ${currentIndex === slideIndex ? "bg-white scale-125" : "bg-white/50"}`}
                        ></div>
                    ))}
                </div>
            </main>
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-10 text-center">
                <div className="bg-[#e3e3e3] p-6 rounded-[20px] transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl cursor-pointer group">
                    <Link to={"/productos"}>
                        <img src={laptop} alt="Laptop" className="w-full max-w-[120px] mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </Link>
                    <h3 className="mt-4 text-lg font-semibold text-black transition-colors group-hover:text-gray-600">Laptop</h3>
                </div>

                <div className="bg-[#e3e3e3] p-6 rounded-[20px] transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl cursor-pointer group">
                    <Link to={"/productos"}>
                        <img src={cpu} alt="PCs" className="w-full max-w-[120px] mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </Link>
                    <h3 className="mt-4 text-lg font-semibold text-black transition-colors group-hover:text-gray-600">PCs</h3>
                </div>

                <div className="bg-[#e3e3e3] p-6 rounded-[20px] transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl cursor-pointer group">
                    <Link to={"/productos"}>
                        <img src={impresora} alt="Impresoras" className="w-full max-w-[120px] mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </Link>
                    <h3 className="mt-4 text-lg font-semibold text-black transition-colors group-hover:text-gray-600">Impresoras</h3>
                </div>

                <div className="bg-[#e3e3e3] p-6 rounded-[20px] transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl cursor-pointer group">
                    <Link to={"/productos"}>
                        <img src={proyector} alt="Proyectores" className="w-full max-w-[120px] mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </Link>
                    <h3 className="mt-4 text-lg font-semibold text-black transition-colors group-hover:text-gray-600">Proyectores</h3>
                </div>

                <div className="bg-[#e3e3e3] p-6 rounded-[20px] transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl cursor-pointer group">
                    <Link to={"/productos"}>
                        <img src={consola} alt="Consolas" className="w-full max-w-[120px] mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </Link>
                    <h3 className="mt-4 text-lg font-semibold text-black transition-colors group-hover:text-gray-600">Consolas</h3>
                </div>
            </section>
        </>
    )
}

export default Carrusel