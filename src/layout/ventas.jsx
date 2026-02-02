import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import HeaderPrivate from "../components/componentsprivate/headerprivate";
import AsidePrivate from "../components/componentsprivate/asideprivate";
import { getSales, registerSale } from '../Services/saleServices';
import { getAllProducts } from '../Services/productServices';

const Ventas = () => {
    const [productos, setProductos] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(''); // This will be the ID string
    const [cantidad, setCantidad] = useState(1);
    const [precioUnitario, setPrecioUnitario] = useState(0);
    const [totalVenta, setTotalVenta] = useState(0);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Cargar datos al montar
    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const [prods, vts] = await Promise.all([
                getAllProducts(),
                getSales()
            ]);
            setProductos(prods);
            setVentas(vts);
        } catch (error) {
            console.error("Error loading data", error);
        }
    };

    // Manejar selección de producto
    const handleProductoChange = (e) => {
        const idStr = e.target.value;
        setProductoSeleccionado(idStr);

        const prod = productos.find(p => p.idStr === idStr);
        if (prod) {
            setPrecioUnitario(parseFloat(prod.precio));
            setTotalVenta(parseFloat(prod.precio) * cantidad);
        } else {
            setPrecioUnitario(0);
            setTotalVenta(0);
        }
    };

    // Manejar cambio de cantidad
    const handleCantidadChange = (e) => {
        let cant = parseInt(e.target.value);
        if (isNaN(cant) || cant < 1) cant = 1;

        const prod = productos.find(p => p.idStr === productoSeleccionado);

        if (prod && cant > prod.stock) {
            Swal.fire({
                icon: 'warning',
                title: 'Stock Insuficiente',
                text: `Solo tienes ${prod.stock} unidades.`,
                confirmButtonColor: '#f59e0b'
            });
            cant = prod.stock;
        }

        setCantidad(cant);
        if (prod) {
            setTotalVenta(parseFloat(prod.precio) * cant);
        }
    };

    // Procesar Venta (Manual POS)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productoSeleccionado || !cantidad) {
            Swal.fire('Error', 'Datos incompletos', 'error');
            return;
        }

        const prod = productos.find(p => p.idStr === productoSeleccionado);
        if (!prod) return;

        try {
            // Adapt to the format expected by registerSale
            const itemsToBuy = [{
                idStr: prod.idStr,
                nombre: prod.nombre,
                precio: parseFloat(prod.precio),
                quantity: parseInt(cantidad)
            }];

            await registerSale(itemsToBuy);

            Swal.fire({
                icon: 'success',
                title: 'Venta Exitosa',
                showConfirmButton: false,
                timer: 1500
            });

            // Refresh data
            cargarDatos();
            // Reset form
            setProductoSeleccionado('');
            setCantidad(1);
            setPrecioUnitario(0);
            setTotalVenta(0);

        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
            <AsidePrivate isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <HeaderPrivate />

            <main className="p-4 md:p-8 pt-[120px] md:ml-[200px] transition-all duration-300">

                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">Registrar Venta</h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1 text-sm text-slate-700">Seleccionar Producto:</label>
                            <select
                                required
                                value={productoSeleccionado}
                                onChange={handleProductoChange}
                                className="border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                            >
                                <option value="">Seleccione un producto...</option>
                                {productos.map(p => (
                                    p.stock > 0 && (
                                        <option key={p.idStr} value={p.idStr}>
                                            {p.nombre} (Stock: {p.stock}) - ${parseFloat(p.precio).toFixed(2)}
                                        </option>
                                    )
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold mb-1 text-sm text-slate-700">Cantidad:</label>
                            <input
                                type="number"
                                min="1"
                                required
                                value={cantidad}
                                onChange={handleCantidadChange}
                                className="border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold mb-1 text-sm text-slate-700">Precio Unitario ($):</label>
                            <input
                                type="text"
                                readOnly
                                value={precioUnitario.toFixed(2)}
                                className="border border-slate-200 bg-slate-50 rounded-lg p-2 text-slate-500 outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold mb-1 text-sm text-slate-700">Total Venta ($):</label>
                            <input
                                type="text"
                                readOnly
                                value={totalVenta.toFixed(2)}
                                className="border border-slate-200 bg-slate-50 rounded-lg p-2 font-bold text-blue-600 outline-none"
                            />
                        </div>

                        <div className="md:col-span-2 pt-2">
                            <button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-8 rounded-lg transition-colors shadow-md">
                                Procesar Venta
                            </button>
                        </div>
                    </form>
                </section>

                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">Historial de Ventas</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800 text-white">
                                    <th className="p-3 rounded-tl-lg">Fecha</th>
                                    <th className="p-3">Producto</th>
                                    <th className="p-3">Cantidad</th>
                                    <th className="p-3">Precio Unit.</th>
                                    <th className="p-3 rounded-tr-lg">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {ventas.map((v) => (
                                    <tr key={v.idStr || v.id} className="hover:bg-slate-50 transition-colors border-b border-slate-100">
                                        <td className="p-3 text-sm text-slate-600">{v.fecha}</td>
                                        <td className="p-3 font-medium text-slate-800">{v.producto}</td>
                                        <td className="p-3 text-center">
                                            <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs font-bold">{v.cantidad}</span>
                                        </td>
                                        <td className="p-3 text-slate-600">${parseFloat(v.precio).toFixed(2)}</td>
                                        <td className="p-3 font-bold text-emerald-600">${parseFloat(v.total).toFixed(2)}</td>
                                    </tr>
                                ))}
                                {ventas.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="p-4 text-center text-slate-500">No hay ventas registradas</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Ventas;
