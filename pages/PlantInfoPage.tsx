import React from 'react';
import { PLANT_DATA } from '../constants';
import { Plant } from '../types';

const PlantDetailCard: React.FC<{ plant: Plant }> = ({ plant }) => (
    <div className="bg-white/80 p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-start gap-6 backdrop-blur-sm">
        <img src={plant.imageUrl} alt={plant.name} className="w-full md:w-32 h-32 object-cover rounded-lg shadow-md shrink-0"/>
        <div className="w-full">
            <h3 className="text-2xl font-bold text-brand-text-highlight mb-2">{plant.name}</h3>
            <ul className="space-y-2 text-brand-text-main/90">
                <li><strong>Environment:</strong> {plant.environment}</li>
                <li><strong>Water:</strong> {plant.water}</li>
                <li><strong>Sunlight:</strong> {plant.sunlight}</li>
                <li><strong>Soil:</strong> {plant.soil}</li>
                <li><strong>Benefits:</strong> {plant.benefits}</li>
            </ul>
        </div>
    </div>
);

const PlantInfoPage: React.FC = () => {
    return (
        <div>
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-text-highlight">🌿 Detailed Plant Information</h1>
                <p className="text-lg text-brand-text-main/80 mt-2">Discover a selection of plants perfect for student life.</p>
            </div>
            <div className="max-w-4xl mx-auto space-y-8">
                {PLANT_DATA.map(plant => (
                    <PlantDetailCard key={plant.id} plant={plant} />
                ))}
            </div>
        </div>
    );
};

export default PlantInfoPage;
