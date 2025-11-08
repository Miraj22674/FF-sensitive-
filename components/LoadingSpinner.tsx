
import React from 'react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-800/50 border border-gray-700 p-6 rounded-lg shadow-lg h-full">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-semibold text-gray-200 font-orbitron">Calculating Trajectories...</p>
            <p className="text-gray-400 text-sm">The AI is finding your perfect aim.</p>
        </div>
    );
};
