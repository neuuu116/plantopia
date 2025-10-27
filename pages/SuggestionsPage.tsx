import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getPlantSuggestions } from '../services/geminiService';
import { RoomConditions, SuggestedPlant } from '../types';
import { PLANT_DATA } from '../constants';

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="relative h-24 w-24">
            <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-brand-primary animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-t-4 border-b-4 border-brand-text-highlight animate-spin-reverse"></div>
        </div>
        <p className="text-2xl font-semibold text-brand-text-main">Consulting our Plant Guru...</p>
        <p className="text-brand-text-main/80">Finding the perfect green companions for your space!</p>
    </div>
);

const SuggestionCard: React.FC<{ plant: SuggestedPlant, index: number }> = ({ plant, index }) => {
    const rankColors = [
        'bg-gradient-to-r from-green-500 to-brand-primary text-white',
        'bg-gradient-to-r from-green-400 to-green-500 text-white',
        'bg-gradient-to-r from-green-300 to-green-400 text-green-800'
    ];

    return (
        <div className="bg-white/80 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 backdrop-blur-sm border border-white">
            <div className={`${rankColors[index] || rankColors[2]} px-6 py-2`}>
                <h4 className="text-lg font-bold">Top Suggestion #{index + 1}</h4>
            </div>
            <div className="p-6">
                <h3 className="text-3xl font-bold text-brand-text-highlight mb-3">{plant.plantName}</h3>
                <p className="text-brand-text-main mb-4">{plant.description}</p>
                 <div className="bg-brand-bg-light/50 p-4 rounded-lg space-y-3 border border-brand-secondary/70 mb-4">
                    <h4 className="font-bold text-brand-text-highlight text-lg">Care Instructions:</h4>
                    <p><strong>☀️ Sunlight:</strong> {plant.careInstructions.sunlight}</p>
                    <p><strong>💧 Watering:</strong> {plant.careInstructions.watering}</p>
                    <p><strong>🌱 Fertilizer:</strong> {plant.careInstructions.fertilizer}</p>
                </div>
                <p className="text-brand-text-main/80 text-sm italic p-3 bg-gray-50 rounded-md">
                   <span className="font-bold text-brand-text-highlight">Why it's a great match:</span> "{plant.reasoning}"
                </p>
            </div>
        </div>
    );
};

const UserConditions: React.FC<{conditions: RoomConditions}> = ({ conditions }) => (
    <div className="bg-white/50 p-4 rounded-xl shadow-md backdrop-blur-sm mb-8">
        <h3 className="text-lg font-bold text-brand-text-highlight mb-2">Your Room's Conditions:</h3>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-text-main">
            <span><strong>Sunlight:</strong> {conditions.sunlight.replace(/_/g, ' ')}</span>
            <span><strong>Soil:</strong> {conditions.soil.replace(/_/g, ' ')}</span>
            <span><strong>Fertilizer:</strong> {conditions.fertilizer}</span>
            <span><strong>Watering Frequency:</strong> every {conditions.wateringFreq} days</span>
            <span><strong>Space:</strong> {conditions.space}</span>
        </div>
    </div>
);


const SuggestionsPage: React.FC = () => {
    const location = useLocation();
    const [suggestions, setSuggestions] = useState<SuggestedPlant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const conditions = location.state?.conditions as RoomConditions;

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!conditions) {
                setError("No room conditions provided. Please go back and fill out the form.");
                setLoading(false);
                return;
            }

            try {
                const result = await getPlantSuggestions(conditions, PLANT_DATA);
                setSuggestions(result);
            } catch (err) {
                console.error("Error fetching suggestions:", err);
                setError("Sorry, we couldn't fetch suggestions at this time. Our plant guru might be taking a nap. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, [conditions]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="text-center p-8 bg-red-100/70 border-2 border-red-300 text-red-800 rounded-2xl shadow-lg backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h2>
                <p className="text-lg">{error}</p>
                 <Link to="/create-room" className="mt-6 inline-block bg-brand-primary text-white font-bold py-3 px-6 rounded-full hover:bg-brand-text-highlight transition-colors shadow-md transform hover:scale-105">
                    Try Again
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-text-highlight">Your Personal Plant Report</h1>
                <p className="text-lg text-brand-text-main/80 mt-2">Based on your room, here are some perfect green companions!</p>
            </div>
            {conditions && <UserConditions conditions={conditions} />}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {suggestions.map((plant, index) => (
                    <SuggestionCard key={index} plant={plant} index={index} />
                ))}
            </div>
             <div className="text-center mt-12">
                <Link to="/create-room" className="bg-white border-2 border-brand-primary text-brand-primary font-bold py-3 px-8 rounded-full hover:bg-brand-primary hover:text-white transition-colors duration-300 text-lg shadow-lg transform hover:scale-105">
                    Get New Suggestions
                </Link>
            </div>
        </div>
    );
};

export default SuggestionsPage;