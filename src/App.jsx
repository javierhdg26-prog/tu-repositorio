import React, { useState, useEffect, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

import Dashboard from './components/UI/Dashboard';
import Login from './components/UI/Login';
import AlertRulesConfig from './components/UI/AlertRulesConfig';
import useProductionData from './components/hooks/useProductionData';

// Componente principal de la aplicación
const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showConfig, setShowConfig] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [firebaseReady, setFirebaseReady] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [showMessage, setShowMessage] = useState(false);
    
    // Aquí inicializamos las reglas de alerta.
    const [alertRules, setAlertRules] = useState({
        minGridValue: 0,
        minTime: 20,
        minAlertCoefficient: 20,
        maxTime: 40,
        maxAlertCoefficient: 20,
        maxGridValue: 60,
    });

    const { productionData, alerts } = useProductionData(isAuthenticated, alertRules);

    const firebaseConfig = {
        // ... (Tu configuración de Firebase aquí)
    };

    useEffect(() => {
        try {
            initializeApp(firebaseConfig);
            setFirebaseReady(true);
        } catch (error) {
            console.error("Error initializing Firebase:", error);
            setFirebaseReady(false);
        }
    }, []);

    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showMessage]);

    const handleLogin = useCallback(() => {
        setIsAuthenticated(true);
    }, []);

    const handleLogout = useCallback(() => {
        setIsAuthenticated(false);
        setShowConfig(false);
    }, []);

    const handleShowConfig = useCallback(() => {
        setShowConfig(true);
    }, []);

    const handleCloseConfig = useCallback(() => {
        setShowConfig(false);
    }, []);

    const handleSaveRules = useCallback((newRules) => {
        setAlertRules(newRules);
        setShowConfig(false);
        setMessage({ text: 'Reglas de alerta guardadas correctamente.', type: 'success' });
        setShowMessage(true);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {isLoading && (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <Loader2 className="animate-spin h-10 w-10 text-purple-500" />
                </div>
            )}
            {!isLoading && (
                isAuthenticated ? (
                    showConfig ? (
                        <AlertRulesConfig
                            onCloseConfig={handleCloseConfig}
                            alertRules={alertRules}
                            onSaveRules={handleSaveRules}
                            setMessage={setMessage}
                            setShowMessage={setShowMessage}
                        />
                    ) : (
                        <Dashboard 
                            onLogout={handleLogout} 
                            productionData={productionData}
                            alerts={alerts}
                            onShowConfig={handleShowConfig}
                            alertRules={alertRules}
                        />
                    )
                ) : (
                    <Login onLogin={handleLogin} isLoading={isLoading} firebaseReady={firebaseReady} />
                )
            )}
            {showMessage && (
                <div className={`fixed bottom-4 right-4 p-4 rounded-xl shadow-lg font-bold text-white z-50 transition-transform duration-300 transform ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {message.text}
                </div>
            )}
        </div>
    );
};

export default App;