import React from 'react';
import { AlertTriangle, TriangleAlert, CheckCheck } from 'lucide-react';

const AlertList = ({ alerts }) => {
    const getAlertIcon = (severity) => {
        switch (severity) {
            case 'red':
                return <AlertTriangle className="text-purple-600" size={20} />;
            case 'yellow':
                return <TriangleAlert className="text-purple-400" size={20} />;
            default:
                return null;
        }
    };

    const getAlertBgClass = (severity) => {
        switch (severity) {
            case 'red':
                return 'bg-purple-100 border-purple-400';
            case 'yellow':
                return 'bg-purple-50 border-purple-200';
            default:
                return 'bg-gray-100 border-gray-300';
        }
    };

    const criticalAlerts = alerts.filter(alert => alert.severity === 'red');

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 space-y-3">
            {criticalAlerts.length > 0 ? (
                criticalAlerts.slice(0, 5).map((alert, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-2 rounded-lg border ${getAlertBgClass(alert.severity)}`}>
                        {getAlertIcon(alert.severity)}
                        <p className="text-sm font-medium text-gray-800">{alert.message}</p>
                        <span className="text-xs text-gray-500 ml-auto">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                ))
            ) : (
                <div className="text-center text-sm text-gray-500">
                    <div className="flex items-center justify-center text-green-500 mb-2">
                        <CheckCheck size={24} />
                    </div>
                    Todo en orden, no hay alertas críticas recientes.
                </div>
            )}
        </div>
    );
};

export default AlertList;