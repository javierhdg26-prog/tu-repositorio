import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import 'chartjs-adapter-date-fns';

const useChart = (chartRef, productionData, alertRules) => {
    const myChart = useRef(null);

    useEffect(() => {
        if (chartRef.current && productionData.length > 0) {
            const data = productionData.map((d) => ({
                x: d.timestamp,
                y: d.cycleTime,
            }));

            const ctx = chartRef.current.getContext("2d");

            if (myChart.current) {
                myChart.current.destroy();
            }

            const alertZonesPlugin = {
                id: 'alertZones',
                beforeDraw: (chart) => {
                    const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
                    ctx.save();
                    
                    const alertRules = chart.options.plugins.alertZones?.alertRules;
                    if (!alertRules) return;

                    const upper_red_start_threshold = alertRules.maxTime + (alertRules.maxAlertCoefficient / 100) * (alertRules.maxGridValue - alertRules.maxTime);
                    const lower_red_end_threshold = (alertRules.minAlertCoefficient / 100) * alertRules.minTime;
                    
                    const redTopYStart = y.getPixelForValue(upper_red_start_threshold);
                    ctx.fillStyle = 'rgba(139, 92, 246, 0.2)'; // Morado oscuro
                    ctx.fillRect(left, top, width, redTopYStart - top);

                    const yellowTopYStart = y.getPixelForValue(alertRules.maxTime);
                    ctx.fillStyle = 'rgba(196, 181, 253, 0.2)'; // Morado claro
                    ctx.fillRect(left, redTopYStart, width, yellowTopYStart - redTopYStart);

                    const yellowBottomYEnd = y.getPixelForValue(alertRules.minTime);
                    const yellowBottomYStart = y.getPixelForValue(lower_red_end_threshold);
                    ctx.fillStyle = 'rgba(196, 181, 253, 0.2)'; // Morado claro
                    ctx.fillRect(left, yellowBottomYStart, width, yellowBottomYEnd - yellowBottomYStart);

                    const redBottomYEnd = y.getPixelForValue(lower_red_end_threshold);
                    const redBottomYStart = y.getPixelForValue(alertRules.minGridValue);
                    ctx.fillStyle = 'rgba(139, 92, 246, 0.2)'; // Morado oscuro
                    ctx.fillRect(left, redBottomYStart, width, redBottomYEnd - redBottomYStart);
                    
                    ctx.restore();
                }
            };

            const chartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: 'second',
                            displayFormats: {
                                second: 'HH:mm:ss'
                            }
                        },
                        title: {
                            display: true,
                            text: "Tiempo"
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Valor de la Variable",
                        },
                        min: 0,
                        max: 100,
                    },
                },
                animation: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            title: (context) => {
                                return `Tiempo: ${new Date(context[0].raw.x).toLocaleTimeString()}`;
                            },
                            label: (context) => `Valor: ${context.raw.y.toFixed(2)}`,
                        },
                    },
                    alertZones: {
                        alertRules: alertRules,
                    },
                },
            };

            myChart.current = new Chart(ctx, {
                type: "line",
                data: {
                    datasets: [{
                        label: "Producción",
                        data: data,
                        borderColor: "#8B5CF6",
                        backgroundColor: "rgba(139, 92, 246, 0.2)",
                        tension: 0.1,
                        pointRadius: 2,
                        pointBackgroundColor: "#8B5CF6",
                    }, ],
                },
                options: chartOptions,
                plugins: [alertZonesPlugin],
            });
        }
    }, [chartRef, productionData, alertRules]);

    return myChart.current;
};

export default useChart;