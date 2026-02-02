import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export const SalesChart = () => {
    // Dummy data replicating logic from js/dashboard.js
    const ventas = [150.50, 200.00, 350.75, 120.20, 500.00, 450.00]; // Sample totals
    const labels = ventas.map((_, i) => `Venta ${i + 1}`);

    const data = {
        labels,
        datasets: [
            {
                label: 'Ventas',
                data: ventas,
                backgroundColor: 'rgba(59,130,246,0.2)',
                borderColor: 'rgba(59,130,246,1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    };

    return <Line data={data} options={options} />;
};

export const ProductsChart = () => {
    // Dummy data replicating logic
    const labels = ['Laptop', 'PC Gamer', 'Mouse', 'Teclado', 'Monitor'];
    const dataValues = [5, 3, 12, 8, 4];

    const data = {
        labels,
        datasets: [
            {
                label: 'Cantidad',
                data: dataValues,
                backgroundColor: 'rgba(59,130,246,0.7)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    };

    return <Bar data={data} options={options} />;
};
