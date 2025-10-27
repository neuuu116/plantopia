import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const homePlants = [
  {
    name: 'Snake Plant',
    imageUrl: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/dcc787c0-f113-4cf6-bf8d-c6c009e92622.png',
    info: 'A resilient indoor plant known for its air-purifying qualities and low maintenance needs. Thrives in indirect light.',
    badges: ['INDOOR', 'LOW LIGHT', 'POPULAR'],
  },
  {
    name: 'Monstera',
    imageUrl: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/7ae73889-63af-4810-a12a-98262d3d7594.png',
    info: 'A popular tropical plant with large split leaves, prefers bright indirect light and moderate watering.',
    badges: ['INDOOR', 'BRIGHT LIGHT', 'POPULAR'],
  },
  {
    name: 'Lavender',
    imageUrl: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/8424a1e6-88c2-4b47-95b6-a5653a2a2ba3.png',
    info: 'A fragrant outdoor plant with calming purple flowers, requires full sun and well-drained soil.',
    badges: ['OUTDOOR', 'FULL SUN', 'FRAGRANT'],
  },
  {
    name: 'Fiddle Leaf Fig',
    imageUrl: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/fc0fd2d1-f033-4dad-9a92-d72a470accd5.png',
    info: 'A trendy indoor tree with large leaves that needs bright indirect light and regular watering.',
    badges: ['INDOOR', 'BRIGHT LIGHT', 'NEW ARRIVAL'],
  },
];

const HomePage: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showInfo, setShowInfo] = useState(false);
    const selectedPlant = homePlants[selectedIndex];

    return (
        <div className="container mx-auto mt-4">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* Left Section */}
                <div className="w-full lg:w-2/5 flex flex-col items-center">
                    <img 
                        src={selectedPlant.imageUrl} 
                        alt={selectedPlant.name}
                        className="w-full max-w-sm h-auto object-cover rounded-2xl bg-white shadow-2xl mb-4"
                    />
                    {showInfo && (
                        <div className="w-full max-w-sm text-center bg-brand-secondary/80 p-4 rounded-lg shadow-md">
                            <p className="font-semibold text-brand-text-highlight">{selectedPlant.info}</p>
                            <div className="mt-2 flex flex-wrap justify-center gap-2">
                                {selectedPlant.badges.map(badge => (
                                    <span key={badge} className="bg-white text-brand-primary text-xs font-semibold px-3 py-1 rounded-full">{badge}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-3/5 text-center lg:text-left">
                    <h1 className="text-4xl md:text-6xl font-black text-brand-text-main leading-tight mb-4 text-shadow">
                        ORNAMENTAL <span className="text-brand-text-highlight">PLANTS</span><br />FOR YOUR ROOM
                    </h1>
                    <p className="text-lg text-brand-text-main/80 mb-8 max-w-xl mx-auto lg:mx-0">
                        Discover fun plant companions for your hostel room! Get personalized plant suggestions and care tips to grow your own green sanctuary.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mb-8">
                        <Link 
                            to="/create-room"
                            className="bg-brand-primary text-white font-bold py-3 px-8 rounded-full hover:bg-brand-text-highlight transition-all duration-300 text-lg shadow-lg transform hover:scale-105"
                        >
                            Find Your Plant
                        </Link>
                        <button 
                            onClick={() => setShowInfo(!showInfo)}
                            className="bg-white border-2 border-brand-primary text-brand-primary font-bold py-3 px-8 rounded-full hover:bg-brand-primary hover:text-white transition-all duration-300 text-lg shadow-lg transform hover:scale-105"
                        >
                            {showInfo ? 'Hide Details' : 'More Details'}
                        </button>
                    </div>
                     <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        {homePlants.map((plant, index) => (
                            <img
                                key={plant.name}
                                src={plant.imageUrl}
                                alt={plant.name}
                                onClick={() => { setSelectedIndex(index); setShowInfo(false); }}
                                className={`w-20 h-20 object-cover rounded-xl cursor-pointer transition-all duration-200 shadow-md border-2 ${selectedIndex === index ? 'border-brand-primary scale-110 shadow-xl' : 'border-transparent hover:scale-105'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
