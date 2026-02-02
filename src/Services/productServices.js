import { db } from "../firebase/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, writeBatch } from "firebase/firestore";

const COLLECTION_NAME = "productos";

// Default initial products
const defaultProducts = [
    { id: 1, nombre: "ASUS TUF A15", precio: 1299.99, categoria: "Laptop", stock: 10, imagen: "/img/1-1.png" },
    { id: 2, nombre: "Lenovo Legion 5", precio: 1399.99, categoria: "Laptop", stock: 10, imagen: "/img/2-2.png" },
    { id: 3, nombre: "HP Pavilion Gaming", precio: 999.99, categoria: "Laptop", stock: 10, imagen: "/img/3-3.png" },
    { id: 4, nombre: "Dell Inspiron 15", precio: 849.99, categoria: "Laptop", stock: 10, imagen: "/img/4-4.png" },
    { id: 5, nombre: "PC Gamer AMD", precio: 1099.99, categoria: "Computadoras", stock: 10, imagen: "/img/5-5.jpg" },
    { id: 6, nombre: "PC Gamer Intel", precio: 1299.99, categoria: "Computadoras", stock: 10, imagen: "/img/14-14.webp" },
    { id: 7, nombre: "PC Office", precio: 699.99, categoria: "Computadoras", stock: 10, imagen: "/img/12-12.webp" },
    { id: 8, nombre: "PC Multimedia", precio: 599.99, categoria: "Computadoras", stock: 10, imagen: "/img/13-13.webp" },
    { id: 9, nombre: "Teclado Mecánico", precio: 79.99, categoria: "Accesorios", stock: 10, imagen: "/img/7-7.png" },
    { id: 10, nombre: "Mouse Gamer", precio: 49.99, categoria: "Accesorios", stock: 10, imagen: "/img/9-9.png" },
    { id: 11, nombre: "Auriculares Gaming", precio: 59.99, categoria: "Accesorios", stock: 10, imagen: "/img/8-8.png" },
    { id: 12, nombre: "Webcam HD", precio: 39.99, categoria: "Accesorios", stock: 10, imagen: "/img/16-16.webp" },
    { id: 13, nombre: "Monitor 24\"", precio: 149.99, categoria: "Accesorios", stock: 10, imagen: "/img/17-17.webp" },
    { id: 14, nombre: "Disco Duro SSD", precio: 119.99, categoria: "Accesorios", stock: 10, imagen: "/img/10-10.webp" },
    { id: 15, nombre: "Memoria RAM 16GB", precio: 89.99, categoria: "Accesorios", stock: 10, imagen: "/img/18-18.jpeg" }
];

// Get all products
export const getAllProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        const products = querySnapshot.docs.map(doc => ({
            idStr: doc.id, // Firestore Doc ID
            ...doc.data()
        }));

        // Sorting by custom numeric ID if present, otherwise by name
        return products.sort((a, b) => a.id - b.id);
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

// Agregar un Producto
export const addProduct = async (productData) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), productData);
        return docRef.id;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

// Actualizar un Producto
export const updateProduct = async (docId, updatedData) => {
    try {
        const productRef = doc(db, COLLECTION_NAME, docId);
        await updateDoc(productRef, updatedData);
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

// Eliminar un Producto
export const deleteProduct = async (docId) => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, docId));
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

// Seed initial products if DB is empty
export const seedProductsIfEmpty = async () => {
    try {
        const products = await getAllProducts();
        if (products.length === 0) {
            console.log("Seeding initial products...");
            const batch = writeBatch(db);

            defaultProducts.forEach(prod => {

                const docRef = doc(db, COLLECTION_NAME, `prod_${prod.id}`);
                batch.set(docRef, prod);
            });

            await batch.commit();
            console.log("Seeding completed.");
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error seeding products:", error);
        return false;
    }
};
