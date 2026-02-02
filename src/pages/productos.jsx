import React, { useEffect, useState } from 'react';
import Header from "../components/header";
import Footer from "../components/footer";
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';
import { getAllProducts, seedProductsIfEmpty } from '../Services/productServices';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                // Check and seed if empty
                await seedProductsIfEmpty();

                // Fetch
                const data = await getAllProducts();
                setProductos(data);
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const handleAddToCart = (producto) => {
        if (producto.stock > 0) {
            addToCart(producto);
            Swal.fire({
                icon: 'success',
                title: 'Agregado',
                text: `${producto.nombre} se añadió al carrito`,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Agotado',
                text: 'Este producto no tiene stock disponible'
            });
        }
    };

    return (
        <>
            <Header />
            <main className="transition-all duration-300">
                <section className="relative bg-[#4391ff] py-15 px-6">
                    <div className="max-w-7xl mx-auto text-center relative z-10">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Nuestro Catálogo</h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Encuetra tu producto al mejor precio en Compu-Store
                        </p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 opacity-90"></div>
                </section>

                <div className="max-w-7xl mx-auto p-6 py-12">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                                {productos.map(prod => (
                                    <div key={prod.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                                        <div className="h-40 w-full overflow-hidden rounded-lg bg-slate-50 flex items-center justify-center relative">
                                            <img
                                                src={prod.imagen}
                                                alt={prod.nombre}
                                                className="h-full w-full object-contain p-2 hover:scale-105 transition-transform"
                                                onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image"; }}
                                            />
                                            {prod.stock === 0 && (
                                                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                                                    <span className="bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">AGOTADO</span>
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-base font-bold text-slate-800 leading-tight min-h-[2.5rem] line-clamp-2">
                                            {prod.nombre}
                                        </h3>

                                        <div className="mt-auto space-y-2">
                                            <div className="flex justify-between items-end border-t pt-2 border-slate-100">
                                                <p className="text-xs font-medium text-slate-500">
                                                    Stock: <span className={`${prod.stock < 5 ? 'text-red-500' : 'text-slate-700'}`}>{prod.stock}</span>
                                                </p>
                                                <p className="text-xl font-bold text-blue-600">${parseFloat(prod.precio).toFixed(2)}</p>
                                            </div>

                                            <button
                                                onClick={() => handleAddToCart(prod)}
                                                disabled={prod.stock === 0}
                                                className={`w-full font-bold py-2 rounded-lg transition-colors shadow-sm text-sm 
                                                    ${prod.stock > 0
                                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
                                            >
                                                {prod.stock > 0 ? 'Agregar' : 'Agotado'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {productos.length === 0 && (
                                <div className="text-center py-20 text-gray-500">
                                    No hay productos disponibles.
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </>
    )
}
export default Productos