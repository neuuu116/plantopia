

import React from 'react';
import { Plant } from '../types';

interface PlantCardProps {
    plant: Plant;
}

const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4.225 4.225a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM15.775 4.225a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM10 5a5 5 0 100 10 5 5 0 000-10zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zM17 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM4.225 15.775a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM15.775 15.775a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>;
const WaterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 20l-4.95-5.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>;

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img className="w-full h-48 object-cover" src={plant.imageUrl} alt={plant.name} />
            <div className="p-6">
                <h3 className="text-2xl font-serif font-bold text-brand-green mb-2">{plant.name}</h3>
                {/* FIX: The 'Plant' type does not have a 'description' property. Replaced with 'environment' which serves as a suitable description. */}
                <p className="text-gray-700 mb-4">{plant.environment}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        <SunIcon />
                        <span>{plant.sunlight} Light</span>
                    </div>
                    <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        <WaterIcon />
                        <span>{plant.water} Water</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlantCard;