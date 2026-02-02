import React, { useEffect, useState } from 'react';
import HeaderPrivate from "../components/componentsprivate/headerprivate";
import AsidePrivate from "../components/componentsprivate/asideprivate";
import { db } from "../firebase/firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';

const UsuariosAdmin = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            const usersList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsuarios(usersList);
        } catch (error) {
            console.error("Error fetching users:", error);
            Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto. Nota: Esto solo borra el perfil, no el acceso Auth.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteDoc(doc(db, "users", id));
                    setUsuarios(usuarios.filter(user => user.id !== id));
                    Swal.fire(
                        '¡Borrado!',
                        'El usuario ha sido eliminado de la base de datos.',
                        'success'
                    );
                } catch (error) {
                    Swal.fire('Error', 'Hubo un error al eliminar', 'error');
                }
            }
        });
    };

    const handleEditRole = async (user) => {
        const { value: role } = await Swal.fire({
            title: 'Cambiar Rol',
            input: 'select',
            inputOptions: {
                'user': 'Usuario',
                'admin': 'Administrador'
            },
            inputPlaceholder: 'Selecciona un rol',
            inputValue: user.rol || 'user',
            showCancelButton: true,
        });

        if (role) {
            try {
                const userRef = doc(db, "users", user.id);
                await updateDoc(userRef, { rol: role });
                fetchUsuarios(); // Refresh list
                Swal.fire('Actualizado', `El rol ha sido cambiado a ${role}`, 'success');
            } catch (error) {
                Swal.fire('Error', 'No se pudo actualizar el rol', 'error');
            }
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
            <AsidePrivate isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <HeaderPrivate onToggleMenu={() => setIsMenuOpen(!isMenuOpen)} />

            <main className="p-4 md:p-8 pt-[120px] md:ml-[200px] transition-all duration-300">
                <section className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Gestión de Usuarios</h1>
                        <p className="text-slate-500">Administra los usuarios registrados</p>
                    </div>
                </section>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wider">
                                    <th className="p-4 font-bold border-b">Nombre</th>
                                    <th className="p-4 font-bold border-b">Email</th>
                                    <th className="p-4 font-bold border-b">Cédula</th>
                                    <th className="p-4 font-bold border-b">Rol</th>
                                    <th className="p-4 font-bold border-b text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center">
                                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                        </td>
                                    </tr>
                                ) : (
                                    usuarios.map((user) => (
                                        <tr key={user.id} className="border-b border-slate-50 last:border-none hover:bg-slate-50 transition-colors">
                                            <td className="p-4">
                                                <div className="font-semibold text-slate-800">{user.nombre} {user.apellido}</div>
                                                <div className="text-xs text-slate-400">ID: {user.uid?.substring(0, 8)}...</div>
                                            </td>
                                            <td className="p-4 text-slate-600">{user.email}</td>
                                            <td className="p-4 text-slate-600 font-mono">{user.cedula}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.rol === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {user.rol || 'USER'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() => handleEditRole(user)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Cambiar Rol"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Eliminar usuario"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UsuariosAdmin;
