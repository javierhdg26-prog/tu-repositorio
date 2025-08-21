import React, { useState, useEffect } from 'react';
import { Settings, Timer, Clock, Percent, X, Save } from 'lucide-react';

const AlertRulesConfig = ({ onCloseConfig, onSaveRules, alertRules }) => {
    const [rules, setRules] = useState(alertRules);
    
    useEffect(() => {
        setRules(alertRules);
    }, [alertRules]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRules(prevRules => ({
            ...prevRules,
            [name]: parseFloat(value)
        }));
    };
    
    const handleSave = () => {
        onSaveRules(rules);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 relative animate-fade-in border border-gray-200">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 text-purple-600">
                            <Settings size={40} strokeWidth={1.5} />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Configuración</h1>
                    </div>
                    <button
                        onClick={onCloseConfig}
                        className="p-2 text-gray-500 rounded-full hover:bg-gray-100 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300"
                        aria-label="Cerrar"
                    >
                        <X size={24} />
                    </button>
                </div>
                {/* Formulario de Configuración con grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                    {/* Campo: minTime */}
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 text-purple-600 flex-shrink-0">
                            <Timer />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="minTime" className="block text-xs font-medium text-gray-700">Tiempo Mínimo Ideal (s)</label>
                            <input
                                type="number"
                                id="minTime"
                                name="minTime"
                                value={rules.minTime}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                            />
                        </div>
                    </div>
                    {/* Campo: maxTime */}
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 text-purple-600 flex-shrink-0">
                            <Clock />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="maxTime" className="block text-xs font-medium text-gray-700">Tiempo Máximo Ideal (s)</label>
                            <input
                                type="number"
                                id="maxTime"
                                name="maxTime"
                                value={rules.maxTime}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                            />
                        </div>
                    </div>
                    {/* Campo: minAlertCoefficient */}
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 text-purple-600 flex-shrink-0">
                            <Percent />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="minAlertCoefficient" className="block text-xs font-medium text-gray-700">Alerta Mínima (%)</label>
                            <input
                                type="number"
                                id="minAlertCoefficient"
                                name="minAlertCoefficient"
                                value={rules.minAlertCoefficient}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                            />
                        </div>
                    </div>
                    {/* Campo: maxAlertCoefficient */}
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 text-purple-600 flex-shrink-0">
                            <Percent />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="maxAlertCoefficient" className="block text-xs font-medium text-gray-700">Alerta Máxima (%)</label>
                            <input
                                type="number"
                                id="maxAlertCoefficient"
                                name="maxAlertCoefficient"
                                value={rules.maxAlertCoefficient}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                            />
                        </div>
                    </div>
                </div>
                {/* Botón de Guardar */}
                <div className="mt-8">
                    <button
                        onClick={handleSave}
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                        <Save size={18} />
                        <span>Guardar Cambios</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertRulesConfig;