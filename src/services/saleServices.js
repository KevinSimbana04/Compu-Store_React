import { db } from "../firebase/firebase";
import { collection, getDocs, addDoc, runTransaction, doc } from "firebase/firestore";

const VENTAS_COLLECTION = "ventas";
const PRODUCTOS_COLLECTION = "productos";

// Obtener todas las ventas
export const getSales = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, VENTAS_COLLECTION));
        const sales = querySnapshot.docs.map(doc => ({
            idStr: doc.id,
            ...doc.data()
        }));
        // Ordenar descendente por timestamp
        return sales.sort((a, b) => b.id - a.id);
    } catch (error) {
        console.error("Error al obtener ventas:", error);
        throw error;
    }
};

// Registrar nueva venta (Transacción: Agregar Venta + Descontar Stock)
// items: Array of { idStr (firestore doc id), nombre, precio, quantity, ... }
export const registerSale = async (items) => {
    try {
        await runTransaction(db, async (transaction) => {

            // 1. Leer todos los docs de productos para asegurar stock suficiente
            for (const item of items) {
                if (!item.idStr) throw new Error(`Producto ${item.nombre} sin ID válido`);

                const productRef = doc(db, PRODUCTOS_COLLECTION, item.idStr);
                const productDoc = await transaction.get(productRef);

                if (!productDoc.exists()) {
                    throw new Error(`El producto "${item.nombre}" ya no existe.`);
                }

                const currentStock = parseInt(productDoc.data().stock);
                if (currentStock < item.quantity) {
                    throw new Error(`Stock insuficiente para "${item.nombre}". Disponible: ${currentStock}`);
                }

                // 2. Encolar Actualización: Descontar stock
                transaction.update(productRef, { stock: currentStock - item.quantity });
            }

            // 3. Encolar Creación: Agregar Registros de Venta
            // Podemos agregar un registro por ítem. Mantendremos eso para la UI.
            const salesCollectionRef = collection(db, VENTAS_COLLECTION);

            items.forEach(item => {
                const newSale = {
                    id: Date.now() + Math.random(), // ID numérico para compatibilidad de orden/visualización
                    fecha: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
                    producto: item.nombre,
                    cantidad: item.quantity,
                    precio: item.precio,
                    total: (item.precio * item.quantity),
                    timestamp: new Date() // Timestamp de Firestore para consultas optimizadas
                };
                const newDocRef = doc(salesCollectionRef); // Crear referencia de nuevo documento
                transaction.set(newDocRef, newSale);
            });
        });

        return true;
    } catch (error) {
        console.error("Falló la transacción: ", error);
        throw error;
    }
};
