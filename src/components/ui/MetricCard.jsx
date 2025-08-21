import React from 'react';
import { LineChart, GaugeCircle, Package } from 'lucide-react';

const MetricCard = ({ icon, value, label }) => {
    const getIcon = (iconName) => {
        switch (iconName) {
            case 'LineChart':
                return <LineChart className="text-purple-600 mb-2 mx-auto" size={32} />;
            case 'GaugeCircle':
                return <GaugeCircle className="text-purple-600 mb-2 mx-auto" size={32} />;
            case 'Package':
                return <Package className="text-purple-600 mb-2 mx-auto" size={32} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center transform transition duration-300 hover:scale-105">
            {getIcon(icon)}
            <p className="text-xl font-bold text-gray-900">{value}</p>
            <p className="text-xs uppercase text-gray-500">{label}</p>
        </div>
    );
};

export default MetricCard;