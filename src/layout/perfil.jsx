import React, { useState, useEffect } from 'react';
import HeaderPrivate from "../components/componentsprivate/headerprivate";
import AsidePrivate from "../components/componentsprivate/asideprivate";
import { auth } from "../firebase/firebase";
import { obtenerPerfilUsuario, actualizarPerfilUsuario, actualizarContrasenaUsuario, cerrarSesion } from "../services/authServices";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
    const [user, setUser] = useState(null);
    const [profileData, setProfileData] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        fechaNacimiento: '',
        direccion: ''
    });
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                try {
                    const data = await obtenerPerfilUsuario(currentUser.uid);
                    if (data) {
                        setProfileData({
                            nombre: data.nombre || '',
                            apellido: data.apellido || '',
                            cedula: data.cedula || '',
                            fechaNacimiento: data.fechaNacimiento || '',
                            direccion: data.direccion || ''
                        });
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                }
                setLoading(false);
            } else {
                setLoading(false);
                navigate('/principal');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            await actualizarPerfilUsuario(user.uid, profileData);
            Swal.fire('¡Éxito!', 'Perfil actualizado correctamente', 'success');
        } catch (error) {
            console.error("Error updating profile:", error);
            Swal.fire('Error', 'No se pudo actualizar el perfil', 'error');
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
            return;
        }
        if (newPassword.length < 6) {
            Swal.fire('Error', 'La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        try {
            await actualizarContrasenaUsuario(user, newPassword);
            Swal.fire('¡Éxito!', 'Contraseña actualizada correctamente', 'success');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error("Error updating password:", error);
            Swal.fire('Error', error.message, 'error');
        }
    };

    const handleLogout = async () => {
        try {
            await cerrarSesion();
            navigate('/login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>;

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
            <AsidePrivate isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <HeaderPrivate onToggleMenu={() => setIsMenuOpen(!isMenuOpen)} />

            <main className="p-4 md:p-8 pt-[120px] md:ml-[200px] transition-all duration-300">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-800 mb-6">Mi Perfil</h1>

                    {/* Información de la Cuenta */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                        <h2 className="text-xl font-bold text-slate-700 mb-4 border-b pb-2">Información de Cuenta</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <p><strong>Email:</strong> {user?.email}</p>
                            <p><strong>UID:</strong> {user?.uid}</p>
                            <p><strong>Miembro desde:</strong> {user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</p>
                            <p><strong>Último acceso:</strong> {user?.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : 'N/A'}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Editar Datos Personales */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-xl font-bold text-slate-700 mb-4 border-b pb-2">Datos Personales</h2>
                            <form onSubmit={handleProfileUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">Nombre</label>
                                    <input
                                        type="text"
                                        value={profileData.nombre}
                                        onChange={(e) => setProfileData({ ...profileData, nombre: e.target.value })}
                                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">Apellido</label>
                                    <input
                                        type="text"
                                        value={profileData.apellido}
                                        onChange={(e) => setProfileData({ ...profileData, apellido: e.target.value })}
                                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">Cédula</label>
                                    <input
                                        type="text"
                                        value={profileData.cedula}
                                        onChange={(e) => setProfileData({ ...profileData, cedula: e.target.value })}
                                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">Fecha de Nacimiento</label>
                                    <input
                                        type="date"
                                        value={profileData.fechaNacimiento}
                                        onChange={(e) => setProfileData({ ...profileData, fechaNacimiento: e.target.value })}
                                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">Dirección</label>
                                    <input
                                        type="text"
                                        value={profileData.direccion}
                                        onChange={(e) => setProfileData({ ...profileData, direccion: e.target.value })}
                                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                                    Guardar Cambios
                                </button>
                            </form>
                        </div>

                        {/* Cambiar Contraseña y Logout */}
                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h2 className="text-xl font-bold text-slate-700 mb-4 border-b pb-2">Cambiar Contraseña</h2>
                                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1">Nueva Contraseña</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="Mínimo 6 caracteres"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1">Confirmar Contraseña</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="Repite la contraseña"
                                        />
                                    </div>
                                    <button type="submit" className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900 transition font-semibold">
                                        Actualizar Contraseña
                                    </button>
                                </form>
                            </div>

                            <div className="bg-red-50 p-6 rounded-2xl shadow-sm border border-red-100 text-center">
                                <h2 className="text-xl font-bold text-red-600 mb-4">Cerrar Sesión</h2>
                                <p className="text-red-500 mb-4 text-sm">¿Deseas salir de tu cuenta?</p>
                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-bold"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Perfil;
