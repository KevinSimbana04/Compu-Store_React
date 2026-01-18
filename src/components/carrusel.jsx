import {useState} from 'react'
import banner1 from "../assets/img/banner1.jpg"
import banner2 from "../assets/img/banner2.jpg"
import laptop from "../assets/img/laptopcate1.png"
import cpu from "../assets/img/cpupcate2.png"
import impresora  from "../assets/img/imprecate2.png"
import proyector from "../assets/img/proyecate3.png"
import consola from "../assets/img/consocate4.png"
import { Link } from 'react-router-dom'

function Carrusel(){
    return(
        <>
            <main className="relative w-full overflow-hidden group">
                <div id="slider" className="flex transition-transform duration-500 ease-out">
                    <div className="min-w-full">
                        <img src={banner1} className="w-full h-[250px] md:h-[350px] lg:h-[450px] object-cover" alt="Banner 1"/>
                    </div>
                    <div className="min-w-full">
                        <img src={banner2} className="w-full h-[250px] md:h-[350px] lg:h-[450px] object-cover" alt="Banner 2"/>
                    </div>
                </div>
                <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    &#10094;
                </button>
                <button  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    &#10095;
                </button>
            </main>
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-10 text-center">
                <div className="bg-[#e3e3e3] p-6 rounded-[20px] transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl cursor-pointer group">
                    <Link to={"/productos"}>
                        <img src= {laptop} alt="Laptop" className="w-full max-w-[120px] mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"/>
                    </Link>
                    <h3 className="mt-4 text-lg font-semibold text-black transition-colors group-hover:text-gray-600">Laptop</h3>
                </div>

                <div className="bg-[#e3e3e3] p-6 rounded-[20px] transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl cursor-pointer group">
                    <Link to={"/productos"}>
                        <img src= {cpu} alt="PCs" className="w-full max-w-[120px] mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"/>
                    </Link>
                    <h3 className="mt-4 text-lg font-semibold text-black transition-colors group-hover:text-gray-600">PCs</h3>
                </div>

                <div className="bg-[#e3e3e3] p-6 rounded-[20px] transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl cursor-pointer group">
                    <Link to={"/productos"}>
                        <img src= {impresora} alt="Impresoras" className="w-full max-w-[120px] mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"/>
                    </Link>
                    <h3 className="mt-4 text-lg font-semibold text-black transition-colors group-hover:text-gray-600">Impresoras</h3>
                </div>

                <div className="bg-[#e3e3e3] p-6 rounded-[20px] transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl cursor-pointer group">
                    <Link to={"/productos"}>
                        <img src={proyector} alt="Proyectores" className="w-full max-w-[120px] mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"/>
                    </Link>
                    <h3 className="mt-4 text-lg font-semibold text-black transition-colors group-hover:text-gray-600">Proyectores</h3>
                </div>

                <div className="bg-[#e3e3e3] p-6 rounded-[20px] transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl cursor-pointer group">
                    <Link to={"/productos"}>
                        <img src={consola} alt="Consolas" className="w-full max-w-[120px] mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"/>
                    </Link>
                    <h3 className="mt-4 text-lg font-semibold text-black transition-colors group-hover:text-gray-600">Consolas</h3>
                </div>
            </section>
        </>
    )
}

export default Carrusel