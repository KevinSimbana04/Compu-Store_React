import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

// Registrar usuario y crear perfil en Firestore
export const registrarUsuario = async (email, password, userData) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guardar datos extra del perfil en Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: email,
            nombre: userData.nombre,
            apellido: userData.apellido,
            cedula: userData.cedula,
            fechaNacimiento: userData.fechaNacimiento,
            direccion: userData.direccion,
            rol: 'user', // Rol por defecto
            createdAt: new Date()
        });

        return user;
    } catch (error) {
        throw error;
    }
};

export const iniciarSesion = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const cerrarSesion = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
};

// Actualizar contraseña del usuario
export const actualizarContrasenaUsuario = async (user, newPassword) => {
    try {
        await updatePassword(user, newPassword);
    } catch (error) {
        throw error;
    }
};

// Obtener perfil de usuario desde Firestore
export const obtenerPerfilUsuario = async (uid) => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error obteniendo perfil de usuario:", error);
        throw error;
    }
};

// Actualizar datos del perfil de usuario
export const actualizarPerfilUsuario = async (uid, data) => {
    try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, data);
    } catch (error) {
        throw error;
    }
};
