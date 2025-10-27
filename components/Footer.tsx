import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white/80 text-brand-text-main mt-auto shadow-inner">
            <div className="container mx-auto py-4 px-4 text-center">
                <p>&copy; {new Date().getFullYear()} Plantopia. Happy Planting!</p>
            </div>
        </footer>
    );
};

export default Footer;
