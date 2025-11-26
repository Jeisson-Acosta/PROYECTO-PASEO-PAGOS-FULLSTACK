import '../styles/PercentageChart.css'
import { useRef, useEffect } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    DoughnutController
} from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController);

export function PercentageChart({ percentage = 60 }) {
    const chartRef = useRef(null)
    const chartInstanceRef = useRef(null)

    // Crear gradiente de colores
    const createGradient = (percentage) => {
        const colors = [];
        const segments = 16;
        
        for (let i = 0; i < segments; i++) {
            const ratio = i / segments;
            if (ratio <= percentage / 100) {
                const greenValue = Math.floor(90 + (ratio * 70));
                colors.push(`rgb(${Math.floor(greenValue * 0.6)}, ${greenValue}, ${Math.floor(greenValue * 0.5)})`);
            } else {
                colors.push('#e0e0e0');
            }
        }
        return colors;
    };

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d')

            // Destruir gráfico anterior si existe
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy()
            }

            // Crear nuevo gráfico
            chartInstanceRef.current = new ChartJS(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: Array(16).fill(100/16),
                        backgroundColor: createGradient(percentage),
                        borderWidth: 2,
                        borderColor: 'white'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    cutout: '75%',
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    },
                    rotation: -90,
                    circumference: 360
                }
            })
        }

        // Limpiar al desmontar
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy()
            }
        }
    }, [percentage])

    return (
        <div className='chart-container'>
            <canvas ref={chartRef}></canvas>
            <div className='center-text'>{percentage}%</div>
        </div>
    )
}
