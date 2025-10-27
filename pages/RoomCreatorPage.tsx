import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomConditions } from '../types';

const RoomCreatorPage: React.FC = () => {
    const navigate = useNavigate();
    const [wateringFreq, setWateringFreq] = useState(14);
    const [conditions, setConditions] = useState<Omit<RoomConditions, 'wateringFreq'>>({
        sunlight: 'bright_indirect',
        soil: 'well_drained',
        fertilizer: 'No',
        importantReq: 'Not Important',
        space: 'small',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fullConditions: RoomConditions = { ...conditions, wateringFreq };
        navigate('/suggestions', { state: { conditions: fullConditions } });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setConditions(prev => ({ ...prev, [name]: value }));
    };

    const cardStyle = "bg-white/80 p-6 rounded-xl shadow-lg backdrop-blur-sm";
    const labelStyle = "block text-lg font-semibold text-brand-text-highlight mb-2";
    const selectStyle = "w-full p-3 bg-brand-bg-light border border-brand-secondary rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary transition";

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-text-highlight">🌿 Find Your Perfect Plant 🌿</h1>
                <p className="text-lg text-brand-text-main/80 mt-2">Tell us about your space, and we'll find the perfect green roommate for you.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className={cardStyle}>
                    <label htmlFor="sunlight" className={labelStyle}>Available Sunlight:</label>
                    <select id="sunlight" name="sunlight" value={conditions.sunlight} onChange={handleSelectChange} className={selectStyle}>
                        <option value="low">Low Light</option>
                        <option value="bright_indirect">Bright Indirect Light</option>
                        <option value="direct">Direct Sunlight</option>
                    </select>
                </div>

                <div className={cardStyle}>
                    <label htmlFor="soil" className={labelStyle}>Type of Soil:</label>
                    <select id="soil" name="soil" value={conditions.soil} onChange={handleSelectChange} className={selectStyle}>
                        <option value="well_drained">Well-drained</option>
                        <option value="sandy">Sandy</option>
                        <option value="moist">Moist</option>
                        <option value="Not Important">Not Important</option>
                    </select>
                </div>

                <div className={cardStyle}>
                    <label htmlFor="fertilizer" className={labelStyle}>Is Fertilizer Available?</label>
                    <select id="fertilizer" name="fertilizer" value={conditions.fertilizer} onChange={handleSelectChange} className={selectStyle}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Not Important">Not Important</option>
                    </select>
                </div>

                <div className={cardStyle}>
                    <label htmlFor="importantReq" className={labelStyle}>Any Important Requirements?</label>
                    <select id="importantReq" name="importantReq" value={conditions.importantReq} onChange={handleSelectChange} className={selectStyle}>
                        <option value="Not Important">Not Important</option>
                        <option value="Low water">Low water needs</option>
                        <option value="Tolerates low light">Tolerates low light</option>
                        <option value="Air purifier">Is a good air purifier</option>
                        <option value="Humid environment">Likes a humid environment</option>
                        <option value="Good for hanging baskets">Good for hanging baskets</option>
                    </select>
                </div>
                
                <div className={cardStyle}>
                    <label htmlFor="wateringFreq" className={labelStyle}>Max days between watering: <span className="text-brand-primary font-bold">{wateringFreq}</span></label>
                    <input type="range" id="wateringFreq" name="wateringFreq" min="7" max="30" value={wateringFreq} onChange={(e) => setWateringFreq(parseInt(e.target.value))} className="w-full h-2 bg-brand-secondary rounded-lg appearance-none cursor-pointer" />
                </div>

                <div className={cardStyle}>
                    <label htmlFor="space" className={labelStyle}>Available Space:</label>
                    <select id="space" name="space" value={conditions.space} onChange={handleSelectChange} className={selectStyle}>
                        <option value="small">Small (Desk or shelf)</option>
                        <option value="medium">Medium (Windowsill or table)</option>
                        <option value="large">Large (Floor space)</option>
                    </select>
                </div>

                <div className="text-center pt-4">
                    <button type="submit" className="bg-brand-primary text-white font-bold py-3 px-12 rounded-full hover:bg-brand-text-highlight transition-all duration-300 text-xl shadow-lg transform hover:scale-105">
                        Get Plant Suggestions
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RoomCreatorPage;
