import Header from "../components/header"
import logo  from "../assets/img/logo.jpg"
import Footer from "../components/footer"
function Nosotros(){
    return(
        <>
        <Header/>
        <main className="flex-grow">
            <section className="relative bg-[#4391ff] py-15 px-6">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Innovación a tu alcance</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                    En Compu-Store, no solo vendemos tecnología; impulsamos tus ideas y conectamos tu mundo con las mejores herramientas digitales.
                    </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 opacity-90"></div>
            </section>

            <section className="max-w-7xl mx-auto py-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-50 blur group-hover:opacity-75 transition duration-200"></div>
                        <img src={logo} alt="Equipo Compu Store" className="relative rounded-2xl shadow-2xl w-full object-cover h-[500px]"/>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-500 pl-4">Nuestra Historia</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Fundada con la pasión por la tecnología, Compu-Store nació como un pequeño emprendimiento universitario y ha crecido hasta convertirse en un referente de confianza. Entendemos las necesidades de estudiantes, profesionales y gamers porque somos como tú.
                        </p>
                    
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                                <h3 className="font-bold text-blue-600 text-lg mb-2">Misión 🚀</h3>
                                <p className="text-sm text-gray-500">Proveer tecnología de vanguardia con asesoramiento experto y precios accesibles para todos.</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                                <h3 className="font-bold text-blue-600 text-lg mb-2">Visión 👁️</h3>
                                <p className="text-sm text-gray-500">Ser la tienda líder en hardware y periféricos, reconocida por nuestra calidad humana y técnica.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 px-6">
                <div className="max-w-7xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">¿Por qué elegirnos?</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 group text-center border border-gray-100">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform">🛡️</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Garantía Total</h3>
                        <p className="text-gray-500">Todos nuestros productos cuentan con garantía de fábrica y soporte directo.</p>
                    </div>
                    <div className="p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 group text-center border border-gray-100">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform">🚚</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Envíos Rápidos</h3>
                        <p className="text-gray-500">Llegamos a donde estés. Envíos seguros a todo el país en tiempo récord.</p>
                    </div>
                    <div className="p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 group text-center border border-gray-100">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform">🎧</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Soporte 24/7</h3>
                        <p className="text-gray-500">Nuestro equipo técnico está listo para resolver tus dudas en cualquier momento.</p>
                    </div>
                </div>
            </section>
        </main>
        <Footer/>
        </>
    )
}

export default Nosotros