import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useCart } from '../context/CartContext';
import { registerSale } from '../Services/saleServices';

const Carrito = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, isCartOpen, toggleCart } = useCart();
    const [processing, setProcessing] = useState(false);

    const total = cartItems.reduce((acc, item) => acc + (parseFloat(item.precio) * item.quantity), 0);

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        setProcessing(true);
        try {
            await registerSale(cartItems);

            Swal.fire({
                icon: 'success',
                title: '¡Compra realizada!',
                text: 'Gracias por tu compra. Se ha generado el registro.',
                timer: 2000,
                showConfirmButton: false
            });
            clearCart();
            toggleCart();
        } catch (error) {
            console.error(error);
            // Error message from service usually contains details about stock
            Swal.fire('Error', error.message || 'No se pudo procesar la compra.', 'error');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[2000] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={toggleCart}
            ></div>

            {/* Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-2xl z-[2001] transition-transform duration-300 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        🛒 Tu Carrito
                    </h2>
                    <button onClick={toggleCart} className="text-gray-500 hover:text-red-500 text-3xl leading-none">&times;</button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center text-gray-500 mt-10">
                            <p className="text-lg">Tu carrito está vacío</p>
                            <p className="text-sm mt-2">¡Explora nuestro catálogo!</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="flex gap-3 border-b border-gray-100 pb-3">
                                {item.imagen ? (
                                    <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded-md border" />
                                ) : (
                                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-400">Sin img</div>
                                )}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-sm line-clamp-1">{item.nombre}</h3>
                                    <p className="text-blue-600 font-bold">${parseFloat(item.precio).toFixed(2)}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            className="w-7 h-7 bg-gray-100 rounded text-center hover:bg-gray-200 font-bold text-gray-600"
                                            onClick={() => updateQuantity(item.id, -1)}
                                        >-</button>
                                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                                        <button
                                            className="w-7 h-7 bg-gray-100 rounded text-center hover:bg-gray-200 font-bold text-gray-600"
                                            onClick={() => updateQuantity(item.id, 1)}
                                        >+</button>
                                    </div>
                                </div>
                                <button className="text-red-400 hover:text-red-600 self-start p-1" onClick={() => removeFromCart(item.id)} title="Eliminar">
                                    🗑️
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-gray-700">Total:</span>
                        <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0 || processing}
                        className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-lg 
                        ${(cartItems.length === 0 || processing) ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:scale-[1.02]'}`}
                    >
                        {processing ? 'Procesando...' : 'Confirmar Compra'}
                    </button>
                    <button
                        onClick={clearCart}
                        disabled={processing}
                        className="w-full mt-3 py-2 text-sm text-gray-500 hover:text-red-500 underline"
                    >
                        Vaciar Carrito
                    </button>
                </div>
            </div>
        </>
    );
};

export default Carrito;
