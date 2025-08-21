import React, { useState } from 'react';
import { CircuitBoard, Loader2 } from 'lucide-react';

const Login = ({ onLogin, isLoading, firebaseReady }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (!email || !password) {
            setErrorMessage('Por favor, ingresa tu correo y contraseña.');
            return;
        }
        onLogin();
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 transform transition duration-500 hover:scale-105 animate-fade-in-up">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 text-purple-600">
                        <CircuitBoard size={64} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Bienvenido</h1>
                    <p className="text-gray-500">Inicia sesión en tu cuenta de SmartFlow</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Correo electrónico</label>
                            <input
                                type="email"
                                placeholder="tu.correo@ejemplo.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Contraseña</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {errorMessage && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center">
                            {errorMessage}
                        </div>
                    )}
                    {!firebaseReady && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center">
                            <p>¡Error de configuración! La conexión a Firebase no está disponible.</p>
                            <p className="font-bold">Por favor, contacta al soporte.</p>
                        </div>
                    )}
                    <div className="mt-8">
                        <button
                            type="submit"
                            className={`w-full bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all transform hover:scale-105 ${isLoading || !firebaseReady ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isLoading || !firebaseReady}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin h-6 w-6 mx-auto" />
                            ) : (
                                'Iniciar sesión'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;