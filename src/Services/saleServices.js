import { db } from "../firebase/firebase";
import { collection, getDocs, addDoc, runTransaction, doc } from "firebase/firestore";

const VENTAS_COLLECTION = "ventas";
const PRODUCTOS_COLLECTION = "productos";

// Get all sales
export const getSales = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, VENTAS_COLLECTION));
        const sales = querySnapshot.docs.map(doc => ({
            idStr: doc.id,
            ...doc.data()
        }));
        // Sort descending by timestamp (assuming `id` or `timestamp` field exists)
        return sales.sort((a, b) => b.id - a.id);
    } catch (error) {
        console.error("Error fetching sales:", error);
        throw error;
    }
};

// Register a new sale (Transaction: Add Sale + Deduct Stock)
// items: Array of { idStr (firestore doc id), nombre, precio, quantity, ... }
export const registerSale = async (items) => {
    try {
        await runTransaction(db, async (transaction) => {

            // 1. Read all product docs to ensure stock allows it
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

                // 2. Queue Update: Deduct stock
                transaction.update(productRef, { stock: currentStock - item.quantity });
            }

            // 3. Queue Creates: Add Sale Records
            // We can add one record per item, or one record per "Order". 
            // The previous logic added one record per item. We will stick to that to match the UI.
            const salesCollectionRef = collection(db, VENTAS_COLLECTION);

            items.forEach(item => {
                const newSale = {
                    id: Date.now() + Math.random(), // Numeric ID for sorting/display compatibility
                    fecha: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
                    producto: item.nombre,
                    cantidad: item.quantity,
                    precio: item.precio,
                    total: (item.precio * item.quantity),
                    timestamp: new Date() // Firestore timestamp for better querying
                };
                const newDocRef = doc(salesCollectionRef); // Create new doc ref
                transaction.set(newDocRef, newSale);
            });
        });

        return true;
    } catch (error) {
        console.error("Transaction failed: ", error);
        throw error;
    }
};
