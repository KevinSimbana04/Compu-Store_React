import React, { useEffect, useState } from 'react';
import HeaderPrivate from "../components/componentsprivate/headerprivate";
import AsidePrivate from "../components/componentsprivate/asideprivate";
import { getSales } from '../Services/saleServices';
import { getAllProducts } from '../Services/productServices';
// Importaciones de Chart.js para gráficos
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {
    const [estadisticas, setEstadisticas] = useState({
        totalVentas: 0,
        ingresosTotales: 0,
        productosActivos: 0,
        ventasRecientes: []
    });
    const [cargando, setCargando] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Efecto: Cargar datos del dashboard al montar
    useEffect(() => {
        const cargarDashboard = async () => {
            setCargando(true);
            try {
                const [ventas, productos] = await Promise.all([
                    getSales(),
                    getAllProducts()
                ]);

                const totalVentas = ventas.length;
                const ingresosTotales = ventas.reduce((acc, v) => acc + parseFloat(v.total), 0);
                const productosActivos = productos.filter(p => p.stock > 0).length;

                // Obtener últimas 5 ventas
                const ventasRecientes = ventas.slice(0, 5);

                setEstadisticas({
                    totalVentas,
                    ingresosTotales,
                    productosActivos,
                    ventasRecientes
                });
            } catch (error) {
                console.error("Error cargando dashboard", error);
            } finally {
                setCargando(false);
            }
        };

        cargarDashboard();
    }, []);

    const dataLine = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Ventas Mensuales',
                data: [30, 45, 60, 50, 70, 90, 100], // Datos de ejemplo estáticos para visualización
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                tension: 0.3,
            },
        ],
    };

    const dataDoughnut = {
        labels: ['Laptops', 'PCs', 'Accesorios', 'Componentes'],
        datasets: [
            {
                label: '# de Ventas',
                data: [12, 19, 3, 5], // Datos de ejemplo estáticos
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
            <AsidePrivate isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <HeaderPrivate onToggleMenu={() => setIsMenuOpen(!isMenuOpen)} />

            <main className="p-4 md:p-8 pt-[120px] md:ml-[200px] transition-all duration-300">
                <section className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Panel de Control</h1>
                    <p className="text-slate-500">Resumen general de la tienda</p>
                </section>

                {/* Cards Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 uppercase">Ventas Totales</p>
                            <h3 className="text-3xl font-bold text-slate-800">{estadisticas.totalVentas}</h3>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-emerald-500 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 uppercase">Ingresos Totales</p>
                            <h3 className="text-3xl font-bold text-slate-800">${estadisticas.ingresosTotales.toFixed(2)}</h3>
                        </div>
                        <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple-500 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 uppercase">Productos Activos</p>
                            <h3 className="text-3xl font-bold text-slate-800">{estadisticas.productosActivos}</h3>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[400px]">
                        <h3 className="text-lg font-bold text-slate-700 mb-4">Tendencia de Ventas</h3>
                        <div className="h-[300px]">
                            <Line data={dataLine} options={{ maintainAspectRatio: false, responsive: true }} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[400px]">
                        <h3 className="text-lg font-bold text-slate-700 mb-4">Ventas por Categoría</h3>
                        <div className="h-[300px] w-full flex justify-center">
                            <Doughnut data={dataDoughnut} options={{ maintainAspectRatio: false, responsive: true }} />
                        </div>
                    </div>
                </div>

                {/* Recent Sales Table */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-700 mb-4">Ventas Recientes</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wider">
                                    <th className="p-3 rounded-tl-lg">Producto</th>
                                    <th className="p-3">Fecha</th>
                                    <th className="p-3">Monto</th>
                                    <th className="p-3 rounded-tr-lg">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {estadisticas.ventasRecientes.map((v) => (
                                    <tr key={v.idStr || v.id} className="border-b border-slate-50 last:border-none hover:bg-slate-50">
                                        <td className="p-3 font-medium text-slate-800">{v.producto}</td>
                                        <td className="p-3 text-sm text-slate-500">{v.fecha}</td>
                                        <td className="p-3 font-bold text-emerald-600">${parseFloat(v.total).toFixed(2)}</td>
                                        <td className="p-3">
                                            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">Completado</span>
                                        </td>
                                    </tr>
                                ))}
                                {estadisticas.ventasRecientes.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="p-4 text-center text-slate-400">No hay ventas recientes</td>
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

export default Dashboard;