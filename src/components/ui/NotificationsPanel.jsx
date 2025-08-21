import React, { useEffect } from 'react';
import { AlertTriangle, TriangleAlert } from 'lucide-react';

const NotificationsPanel = ({ alerts, setIsPanelVisible, panelRef }) => {
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target) && event.target.closest('.notification-button') === null) {
                setIsPanelVisible(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [setIsPanelVisible, panelRef]);

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

    return (
        <div ref={panelRef} className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 animate-fade-in z-20 overflow-hidden">
            <div className="py-2">
                <div className="px-4 py-2">
                    <h3 className="text-lg font-bold text-gray-800">Notificaciones</h3>
                </div>
                {alerts.length > 0 ? (
                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar px-2 pb-2">
                        {alerts.map((alert, index) => (
                            <div
                                key={index}
                                className={`flex items-start space-x-3 p-2 my-1 rounded-lg border ${getAlertBgClass(alert.severity)}`}
                            >
                                {getAlertIcon(alert.severity)}
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800 break-words">{alert.message}</p>
                                    <span className="text-xs text-gray-500">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="px-4 py-6 text-center text-gray-500">
                        No hay notificaciones recientes.
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPanel;