import { useState, useEffect } from 'react';

const useProductionData = (isAuthenticated, alertRules) => {
    const [productionData, setProductionData] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        if (!isAuthenticated || !alertRules) return;
        
        const interval = setInterval(() => {
            const now = Date.now();
            let newCycleTime;

            const { maxTime, minTime, maxAlertCoefficient, minAlertCoefficient, maxGridValue, minGridValue } = alertRules;

            const red_top_start_threshold = maxTime + (maxAlertCoefficient / 100) * (maxGridValue - maxTime);
            const yellow_top_start_threshold = maxTime;
            const yellow_bottom_end_threshold = minTime;
            const red_bottom_end_threshold = (minAlertCoefficient / 100) * minTime;

            const randomProbability = Math.random();

            if (randomProbability < 0.70) {
                newCycleTime = Math.random() * (yellow_top_start_threshold - yellow_bottom_end_threshold) + yellow_bottom_end_threshold;
            } else if (randomProbability < 0.90) {
                if (Math.random() < 0.5) {
                    newCycleTime = Math.random() * (red_top_start_threshold - yellow_top_start_threshold) + yellow_top_start_threshold;
                } else {
                    newCycleTime = Math.random() * (yellow_bottom_end_threshold - red_bottom_end_threshold) + red_bottom_end_threshold;
                }
            } else {
                if (Math.random() < 0.5) {
                    newCycleTime = Math.random() * (maxGridValue - red_top_start_threshold) + red_top_start_threshold;
                } else {
                    newCycleTime = Math.random() * (red_bottom_end_threshold - minGridValue) + minGridValue;
                }
            }
            
            const newOEE = Math.random() * 0.2 + 0.75;

            setProductionData(prevData => {
                const updatedData = [...prevData, {
                    timestamp: now,
                    cycleTime: newCycleTime,
                    oee: newOEE,
                    value: newCycleTime,
                }];
                return updatedData.slice(-20);
            });

            const newAlerts = [];
            const alertMessage = (severity, type, value) => {
                let message;
                switch (severity) {
                    case 'red':
                        message = '¡ALERTA CRÍTICA! ';
                        break;
                    case 'yellow':
                        message = '¡ADVERTENCIA! ';
                        break;
                    default:
                        message = '';
                }
                switch (type) {
                    case 'cycleTime':
                        return `${message}El tiempo de ciclo (${value.toFixed(1)}s) ha ingresado en una zona de riesgo.`;
                    default:
                        return `${message}Se ha detectado una anomalía.`;
                }
            };
            
            if (newCycleTime > red_top_start_threshold || newCycleTime <= red_bottom_end_threshold) {
                newAlerts.push({
                    message: alertMessage('red', 'cycleTime', newCycleTime),
                    timestamp: now,
                    severity: 'red'
                });
            } else if ((newCycleTime > yellow_top_start_threshold && newCycleTime <= red_top_start_threshold) || (newCycleTime > red_bottom_end_threshold && newCycleTime <= yellow_bottom_end_threshold)) {
                newAlerts.push({
                    message: alertMessage('yellow', 'cycleTime', newCycleTime),
                    timestamp: now,
                    severity: 'yellow'
                });
            }

            if (newAlerts.length > 0) {
                setAlerts(prevAlerts => [...newAlerts, ...prevAlerts].slice(0, 20));
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [isAuthenticated, alertRules]);

    return { productionData, alerts };
};

export default useProductionData;