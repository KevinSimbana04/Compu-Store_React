
import Header from "../components/header"
import Footer from "../components/footer"
import Img1 from "../assets/img/1-1.png"
import Img2 from "../assets/img/2-2.png"
import Img3 from "../assets/img/3-3.png"
import Img4 from "../assets/img/4-4.png"
import Img5 from "../assets/img/5-5.jpg"
function Productos(){

    return(
        <>
        <Header/>
        <main className="  transition-all duration-300">
            <section className="relative bg-[#4391ff] py-15 px-6">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Nuestro Catálogo</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                    Encuetra tu producto al mejor precio en Compu-Store
                    </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 opacity-90"></div>
            </section>
        </main>
        <div className="max-w-7xl mx-auto p-6 py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        
                        {/* --- PRODUCTO 1 --- */}
                        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                            <div className="h-40 w-full overflow-hidden rounded-lg bg-slate-50 flex items-center justify-center relative">
                                <img src={Img1} alt="ASUS TUF A15" className="h-full w-full object-contain p-2 hover:scale-105 transition-transform" />
                            </div>
                            <h3 className="text-base font-bold text-slate-800 leading-tight min-h-[2.5rem]">
                                ASUS TUF A15
                            </h3>
                            <div className="mt-auto space-y-2">
                                <div className="flex justify-between items-end border-t pt-2 border-slate-100">
                                    <p className="text-xs font-medium text-slate-500">Stock: <span className="text-slate-700">10</span></p>
                                    <p className="text-xl font-bold text-blue-600">$1299.99</p>
                                </div>
                                <button className="w-full font-bold py-2 rounded-lg transition-colors shadow-sm text-sm bg-blue-600 hover:bg-blue-700 text-white">
                                    Agregar
                                </button>
                            </div>
                        </div>
                        {/* --- PRODUCTO 2 --- */}
                        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                            <div className="h-40 w-full overflow-hidden rounded-lg bg-slate-50 flex items-center justify-center relative">
                                <img src={Img2} alt="Lenovo Legion 5" className="h-full w-full object-contain p-2 hover:scale-105 transition-transform" />
                            </div>
                            <h3 className="text-base font-bold text-slate-800 leading-tight min-h-[2.5rem]">
                                Lenovo Legion 5
                            </h3>
                            <div className="mt-auto space-y-2">
                                <div className="flex justify-between items-end border-t pt-2 border-slate-100">
                                    <p className="text-xs font-medium text-slate-500">Stock: <span className="text-slate-700">5</span></p>
                                    <p className="text-xl font-bold text-blue-600">$1399.99</p>
                                </div>
                                <button className="w-full font-bold py-2 rounded-lg transition-colors shadow-sm text-sm bg-blue-600 hover:bg-blue-700 text-white">
                                    Agregar
                                </button>
                            </div>
                        </div>

                        {/* --- PRODUCTO 3 (Agotado) --- */}
                        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                            <div className="h-40 w-full overflow-hidden rounded-lg bg-slate-50 flex items-center justify-center relative">
                                <img src={Img3} alt="HP Pavilion Gaming" className="h-full w-full object-contain p-2 hover:scale-105 transition-transform" />
                            </div>
                            <h3 className="text-base font-bold text-slate-800 leading-tight min-h-[2.5rem]">
                                HP Pavilion Gaming
                            </h3>
                            <div className="mt-auto space-y-2">
                                <div className="flex justify-between items-end border-t pt-2 border-slate-100">
                                    <p className="text-xs font-medium text-slate-500">Stock: <span className="text-red-500 font-bold">0</span></p>
                                    <p className="text-xl font-bold text-blue-600">$999.99</p>
                                </div>
                                {/* Botón deshabilitado manual */}
                                <button disabled className="w-full font-bold py-2 rounded-lg transition-colors shadow-sm text-sm bg-slate-300 text-slate-500 cursor-not-allowed">
                                    Agotado
                                </button>
                            </div>
                        </div>

                        {/* --- PRODUCTO 4 --- */}
                        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                            <div className="h-40 w-full overflow-hidden rounded-lg bg-slate-50 flex items-center justify-center relative">
                                <img src={Img4} alt="Dell Inspiron 15" className="h-full w-full object-contain p-2 hover:scale-105 transition-transform" />
                            </div>
                            <h3 className="text-base font-bold text-slate-800 leading-tight min-h-[2.5rem]">
                                Dell Inspiron 15
                            </h3>
                            <div className="mt-auto space-y-2">
                                <div className="flex justify-between items-end border-t pt-2 border-slate-100">
                                    <p className="text-xs font-medium text-slate-500">Stock: <span className="text-slate-700">8</span></p>
                                    <p className="text-xl font-bold text-blue-600">$849.99</p>
                                </div>
                                <button className="w-full font-bold py-2 rounded-lg transition-colors shadow-sm text-sm bg-blue-600 hover:bg-blue-700 text-white">
                                    Agregar
                                </button>
                            </div>
                        </div>

                        {/* --- PRODUCTO 5 --- */}
                        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                            <div className="h-40 w-full overflow-hidden rounded-lg bg-slate-50 flex items-center justify-center relative">
                                <img src={Img5} alt="PC Gamer AMD" className="h-full w-full object-contain p-2 hover:scale-105 transition-transform" />
                            </div>
                            <h3 className="text-base font-bold text-slate-800 leading-tight min-h-[2.5rem]">
                                PC Gamer AMD
                            </h3>
                            <div className="mt-auto space-y-2">
                                <div className="flex justify-between items-end border-t pt-2 border-slate-100">
                                    <p className="text-xs font-medium text-slate-500">Stock: <span className="text-red-500 font-bold">3</span></p>
                                    <p className="text-xl font-bold text-blue-600">$1099.99</p>
                                </div>
                                <button className="w-full font-bold py-2 rounded-lg transition-colors shadow-sm text-sm bg-blue-600 hover:bg-blue-700 text-white">
                                    Agregar
                                </button>
                            </div>
                        </div>        
                </div>
        </div>    
        <Footer/>
        </>
    )
}
export default Productos