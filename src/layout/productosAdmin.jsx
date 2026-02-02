import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import HeaderPrivate from "../components/componentsprivate/headerprivate";
import AsidePrivate from "../components/componentsprivate/asideprivate";
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../Services/productServices';

const ProductosAdmin = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        categoria: 'Computadoras',
        stock: '',
        imagen: ''
    });
    const [idEditar, setIdEditar] = useState(null); // This will hold the Document ID (string)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Cargar productos
    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            setLoading(true);
            const data = await getAllProducts();
            setProductos(data);
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Manejar cambios en formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    // Agregar o Actualizar Producto
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert numeric fields
        const payload = {
            ...formData,
            precio: parseFloat(formData.precio),
            stock: parseInt(formData.stock)
        };

        try {
            if (idEditar) {
                // Update
                await updateProduct(idEditar, payload);
                Swal.fire({
                    icon: 'success',
                    title: 'Actualizado',
                    text: 'Producto modificado correctamente.',
                    timer: 1500,
                    showConfirmButton: false
                });
                setIdEditar(null);
            } else {
                // Add
                // We add a numeric ID just for compatibility with current sorting, 
                // but strictly speaking Firestore manages IDs.
                // We'll trust the component to display what it gets.
                const newId = productos.length > 0 ? Math.max(...productos.map(p => p.id || 0)) + 1 : 1;
                await addProduct({ ...payload, id: newId });

                Swal.fire({
                    icon: 'success',
                    title: 'Agregado',
                    text: `Se ha registrado ${formData.nombre}.`,
                    timer: 1500,
                    showConfirmButton: false
                });
            }

            // Reset and Reload
            setFormData({
                nombre: '',
                precio: '',
                categoria: 'Computadoras',
                stock: '',
                imagen: ''
            });
            cargarProductos();

        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Hubo un problema al guardar', 'error');
        }
    };

    // Cargar datos para edición
    const handleEdit = (prod) => {
        setFormData({
            nombre: prod.nombre,
            precio: prod.precio,
            categoria: prod.categoria,
            stock: prod.stock,
            imagen: prod.imagen
        });
        setIdEditar(prod.idStr); // Use Firestore ID for updates
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Eliminar producto
    const handleDelete = (docId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#cbd5e1',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteProduct(docId);
                    Swal.fire('Eliminado!', 'El producto ha sido eliminado.', 'success');
                    cargarProductos();
                } catch (error) {
                    Swal.fire('Error', 'No se pudo eliminar.', 'error');
                }
            }
        });
    };

    return (
        <div className="bg-slate-100 min-h-screen font-sans text-slate-900">
            <AsidePrivate isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <HeaderPrivate />

            <main className="p-4 md:p-8 pt-[120px] md:ml-[200px] transition-all duration-300">

                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">
                        {idEditar ? 'Editar Producto' : 'Registrar Producto'}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1 text-sm text-slate-700">Nombre del producto:</label>
                            <input
                                type="text"
                                id="nombre"
                                required
                                value={formData.nombre}
                                onChange={handleChange}
                                className="border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold mb-1 text-sm text-slate-700">Precio ($):</label>
                            <input
                                type="number"
                                id="precio"
                                step="0.01"
                                required
                                value={formData.precio}
                                onChange={handleChange}
                                className="border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold mb-1 text-sm text-slate-700">Categoría:</label>
                            <select
                                id="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                                className="border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                            >
                                <option value="Computadoras">Computador</option>
                                <option value="Accesorios">Accesorio</option>
                                <option value="Componentes">Componente</option>
                                <option value="Laptop">Laptop</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold mb-1 text-sm text-slate-700">Cantidad en stock:</label>
                            <input
                                type="number"
                                id="stock"
                                required
                                value={formData.stock}
                                onChange={handleChange}
                                className="border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label className="font-semibold mb-1 text-sm text-slate-700">Imagen (URL):</label>
                            <input
                                type="text"
                                id="imagen"
                                placeholder="https://"
                                value={formData.imagen}
                                onChange={handleChange}
                                className="border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="md:col-span-2 pt-2">
                            <button
                                type="submit"
                                className={`w-full md:w-auto text-white font-bold py-2.5 px-8 rounded-lg transition-colors shadow-md ${idEditar ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                {idEditar ? 'Actualizar Producto' : 'Agregar Producto'}
                            </button>
                        </div>
                    </form>
                </section>

                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">Listado de Productos</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800 text-white">
                                    <th className="p-3 rounded-tl-lg">ID</th>
                                    <th className="p-3">Producto</th>
                                    <th className="p-3">Precio</th>
                                    <th className="p-3">Categoría</th>
                                    <th className="p-3">Stock</th>
                                    <th className="p-3">Imagen</th>
                                    <th className="p-3 rounded-tr-lg">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {loading ? (
                                    <tr><td colSpan="7" className="p-8 text-center">Cargando...</td></tr>
                                ) : (
                                    productos.map(prod => (
                                        <tr key={prod.idStr} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-3 font-medium text-slate-600">{prod.id}</td>
                                            <td className="p-3">{prod.nombre}</td>
                                            <td className="p-3 font-semibold text-blue-600">${parseFloat(prod.precio).toFixed(2)}</td>
                                            <td className="p-3 text-sm text-slate-500">{prod.categoria}</td>
                                            <td className="p-3">{prod.stock}</td>
                                            <td className="p-3">
                                                {prod.imagen ?
                                                    <img src={prod.imagen} alt={prod.nombre} className="w-12 h-12 object-cover rounded-md shadow-sm border" />
                                                    : <div className="w-12 h-12 bg-slate-200 rounded-md"></div>
                                                }
                                            </td>
                                            <td className="p-3">
                                                <div className="flex gap-2">
                                                    <button
                                                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                                                        onClick={() => handleEdit(prod)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                                                        onClick={() => handleDelete(prod.idStr)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                {!loading && productos.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="p-4 text-center text-slate-500">No hay productos registrados</td>
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

export default ProductosAdmin;
