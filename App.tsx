
import React, { useState, useCallback } from 'react';
import { InputForm } from './components/InputForm';
import { SettingsDisplay } from './components/SettingsDisplay';
import { getSensitivitySettings } from './services/geminiService';
import type { SensitivitySettings, UserInput } from './types';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
    const [settings, setSettings] = useState<SensitivitySettings | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async (userInput: UserInput) => {
        setIsLoading(true);
        setError(null);
        setSettings(null);

        try {
            const result = await getSensitivitySettings(userInput);
            setSettings(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <header className="text-center mb-8">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 font-orbitron">
                    Free Fire Sensitivity AI
                </h1>
                <p className="mt-2 text-lg text-gray-400 max-w-2xl mx-auto">
                    Get pro-level sensitivity settings customized for your device.
                </p>
            </header>
            
            <main className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="w-full">
                    <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
                </div>
                
                <div className="w-full">
                    {isLoading && <LoadingSpinner />}
                    {error && (
                         <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg shadow-lg flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="font-bold font-orbitron">Error</h3>
                                <p>{error}</p>
                            </div>
                         </div>
                    )}
                    {settings && !isLoading && (
                        <SettingsDisplay settings={settings} />
                    )}
                     {!settings && !isLoading && !error && (
                         <div className="bg-gray-800/50 border border-gray-700 text-gray-400 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center h-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l1.414 1.414M4.222 4.222l1.414 1.414m12.728 0l-1.414 1.414M5.636 18.364l-1.414 1.414M12 16a4 4 0 110-8 4 4 0 010 8z" />
                            </svg>
                            <h3 className="text-xl font-bold font-orbitron text-gray-200">Awaiting Your Specs</h3>
                            <p className="text-center mt-2">Enter your device details to generate personalized sensitivity settings.</p>
                         </div>
                     )}
                </div>
            </main>
        </div>
    );
};

export default App;
