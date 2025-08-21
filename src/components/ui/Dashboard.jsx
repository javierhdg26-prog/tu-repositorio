import React, { useState, useEffect, useRef, useCallback } from 'react';
import Chart from 'chart.js/auto';
import { BellRing, CircuitBoard, Settings, LogOut, AlertTriangle, TriangleAlert, CheckCheck } from 'lucide-react';
import useChart from '../hooks/useChart';
import MetricCard from './MetricCard';
import NotificationsPanel from './NotificationsPanel';
import AlertList from './AlertList';

const Dashboard = ({ onLogout, productionData, alerts, onShowConfig, alertRules }) => {
    const chartRef = useRef(null);
    const panelRef = useRef(null);
    const [isPanelVisible, setIsPanelVisible] = useState(false);

    useChart(chartRef, productionData, alertRules);

    const getMetrics = useCallback(() => {
        if (productionData.length === 0) {
            return { efficiency: 'N/A', avgCycleTime: 'N/A', units: 'N/A' };
        }
        const latestOEE = productionData[productionData.length - 1]?.oee || 0;
        const avgCycleTime = productionData.reduce((sum, d) => sum + d.cycleTime, 0) / productionData.length;
        const totalUnits = productionData.length;
        return {
            efficiency: `${(latestOEE * 100).toFixed(1)}%`,
            avgCycleTime: `${avgCycleTime.toFixed(1)}s`,
            units: `${totalUnits}`,
        };
    }, [productionData]);

    const metrics = getMetrics();
    const totalAlertsCount = alerts.length;
    const criticalAlerts = alerts.filter(alert => alert.severity === 'red');

    const handleBellClick = (event) => {
        event.stopPropagation();
        setIsPanelVisible(!isPanelVisible);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md max-h-[95vh] h-[95vh] bg-white rounded-[2rem] shadow-xl p-6 relative animate-fade-in border border-gray-200 overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 z-10">
                    <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 text-purple-600">
                            <CircuitBoard size={40} strokeWidth={1.5} />
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">SmartFlow</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={onShowConfig} className="relative p-2 text-gray-500 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-transform duration-200 ease-in-out hover:scale-110" aria-label="Configuración">
                            <Settings size={32} strokeWidth={1.5} />
                        </button>
                        <div className="relative">
                            <button onClick={handleBellClick} className="notification-button relative p-2 text-gray-500 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-transform duration-200 ease-in-out hover:scale-110" aria-label="Notificaciones">
                                <BellRing size={32} strokeWidth={1.5} />
                                {totalAlertsCount > 0 && (<span className="absolute min-w-[1.5rem] h-6 rounded-full flex items-center justify-center -top-2 -right-2.5 transition-transform duration-200 ease-out border-2 border-white text-xs font-bold text-white bg-purple-600">{totalAlertsCount}</span>)}
                            </button>
                            {isPanelVisible && <NotificationsPanel panelRef={panelRef} alerts={alerts} setIsPanelVisible={setIsPanelVisible} />}
                        </div>
                        <button onClick={onLogout} className="relative p-2 text-gray-500 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-transform duration-200 ease-in-out hover:scale-110" aria-label="Cerrar sesión">
                            <LogOut size={32} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
                {/* Dashboard Content */}
                <div className="dashboard-content pb-4">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Panel de Producción</h2>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Resumen de Métricas</h3>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <MetricCard icon="LineChart" value={metrics.efficiency} label="Eficiencia" />
                        <MetricCard icon="GaugeCircle" value={metrics.avgCycleTime} label="Ciclo Medio" />
                        <MetricCard icon="Package" value={metrics.units} label="Unidades" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Análisis de rendimiento</h3>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 h-80 mb-6">
                        <canvas ref={chartRef}></canvas>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Últimas Alertas Críticas</h3>
                    <AlertList alerts={criticalAlerts} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;