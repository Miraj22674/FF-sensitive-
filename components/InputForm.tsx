import React, { useState } from 'react';
import type { UserInput } from '../types';

interface InputFormProps {
    onGenerate: (userInput: UserInput) => void;
    isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
    const [phoneModel, setPhoneModel] = useState('');
    const [ram, setRam] = useState('');
    const [screenSize, setScreenSize] = useState('');
    const [gyroscope, setGyroscope] = useState<'ON' | 'OFF'>('OFF');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate({ 
            phoneModel, 
            ram: Number(ram), 
            screenSize: Number(screenSize), 
            gyroscope 
        });
    };

    const inputStyles = "w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300";

    return (
        <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg shadow-lg backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-orange-400 font-orbitron">Device Specifications</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="phoneModel" className="block text-sm font-medium text-gray-300 mb-1">Phone Model</label>
                    <input
                        id="phoneModel"
                        type="text"
                        value={phoneModel}
                        onChange={(e) => setPhoneModel(e.target.value)}
                        placeholder="e.g., iPhone 13 Pro"
                        required
                        className={inputStyles}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="ram" className="block text-sm font-medium text-gray-300 mb-1">RAM (GB)</label>
                        <input
                            id="ram"
                            type="number"
                            value={ram}
                            onChange={(e) => setRam(e.target.value)}
                            placeholder="e.g., 8"
                            required
                            min="1"
                            className={inputStyles}
                        />
                    </div>
                    <div>
                        <label htmlFor="screenSize" className="block text-sm font-medium text-gray-300 mb-1">Screen Size (inches)</label>
                        <input
                            id="screenSize"
                            type="number"
                            step="0.1"
                            value={screenSize}
                            onChange={(e) => setScreenSize(e.target.value)}
                            placeholder="e.g., 6.7"
                            required
                            min="3"
                            className={inputStyles}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Gyroscope</label>
                    <div className="flex space-x-2">
                        <button
                            type="button"
                            onClick={() => setGyroscope('ON')}
                            className={`w-1/2 py-2 text-sm font-bold rounded-md transition duration-300 ${gyroscope === 'ON' ? 'bg-orange-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                            ON
                        </button>
                        <button
                            type="button"
                            onClick={() => setGyroscope('OFF')}
                            className={`w-1/2 py-2 text-sm font-bold rounded-md transition duration-300 ${gyroscope === 'OFF' ? 'bg-orange-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                            OFF
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 px-4 rounded-md hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-orange-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-orbitron"
                >
                    {isLoading ? 'Optimizing...' : 'Generate Settings'}
                </button>
            </form>
        </div>
    );
};