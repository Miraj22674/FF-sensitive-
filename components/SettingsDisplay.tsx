
import React, { useState } from 'react';
import type { SensitivitySettings } from '../types';

interface SettingsDisplayProps {
    settings: SensitivitySettings;
}

const SettingItem: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div className="flex justify-between items-center py-3">
        <span className="text-gray-300">{label}</span>
        <span className="text-xl font-bold text-orange-400 font-orbitron">{value}</span>
    </div>
);

export const SettingsDisplay: React.FC<SettingsDisplayProps> = ({ settings }) => {
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

    const handleCopy = () => {
        const textToCopy = `
        Free Fire Sensitivity Settings:
        - General: ${settings.general}
        - Red Dot: ${settings.redDot}
        - 2X Scope: ${settings.twoXScope}
        - 4X Scope: ${settings.fourXScope}
        - Sniper Scope: ${settings.sniperScope}
        - Free Look: ${settings.freeLook}
        - DPI: ${settings.dpi}
        `;
        navigator.clipboard.writeText(textToCopy.trim());
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 2000);
    };

    return (
        <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg shadow-lg backdrop-blur-sm animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-orange-400 font-orbitron">AI Recommendations</h2>
                <button
                    onClick={handleCopy}
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm py-2 px-3 rounded-md transition duration-300"
                >
                    {copyStatus === 'idle' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    ) : (
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                    <span>{copyStatus === 'idle' ? 'Copy' : 'Copied!'}</span>
                </button>
            </div>
            
            <div className="space-y-2 divide-y divide-gray-700">
                <SettingItem label="General" value={settings.general} />
                <SettingItem label="Red Dot" value={settings.redDot} />
                <SettingItem label="2X Scope" value={settings.twoXScope} />
                <SettingItem label="4X Scope" value={settings.fourXScope} />
                <SettingItem label="Sniper Scope" value={settings.sniperScope} />
                <SettingItem label="Free Look" value={settings.freeLook} />
                <div className="border-t border-orange-500/50 pt-3 mt-3 !border-solid">
                  <SettingItem label="DPI" value={settings.dpi} />
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-bold font-orbitron text-gray-200 mb-2">AI Reasoning</h3>
                <div className="bg-gray-900/70 p-4 rounded-md text-gray-300 text-sm leading-relaxed">
                    <p>{settings.reasoning}</p>
                </div>
            </div>
        </div>
    );
};

// Add fade-in animation to tailwind config or a style tag if not present
const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
}
`;
document.head.appendChild(style);
