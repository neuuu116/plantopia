import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    const shopRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    const navLinkClasses = "text-brand-text-main hover:text-brand-primary px-3 py-2 rounded-md text-base font-medium transition-colors";
    const activeLinkClasses = "text-brand-primary font-bold";

    const toggleShop = () => {
        setIsShopOpen(prev => !prev);
        setIsContactOpen(false);
    };

    const toggleContact = () => {
        setIsContactOpen(prev => !prev);
        setIsShopOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (shopRef.current && !shopRef.current.contains(event.target as Node)) {
                setIsShopOpen(false);
            }
            if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
                setIsContactOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const closeAllMenus = () => {
        setIsMobileMenuOpen(false);
        setIsShopOpen(false);
        setIsContactOpen(false);
    }

    return (
        <header className="bg-white/90 shadow-md sticky top-0 z-50 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
                             <div className="bg-brand-primary/20 rounded-full p-1.5">
                                <svg role="img" aria-label="Plant Robot Logo" className="h-7 w-7 text-brand-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 9V8C16 6.89543 15.1046 6 14 6H10C8.89543 6 8 6.89543 8 8V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 18H7.375C6.09703 18 5.45805 18 5.01121 17.6915C4.24074 17.1593 4.07384 16.1952 4.39409 15.3444C4.51039 15.0182 4.70014 14.7255 5.07963 14.1401L5.70711 13.1401C5.89464 12.8474 6 12.5015 6 12.1466V11C6 9.89543 6.89543 9 8 9H16C17.1046 9 18 9.89543 18 11V12.1466C18 12.5015 18.1054 12.8474 18.2929 13.1401L18.9204 14.1401C19.2999 14.7255 19.4896 15.0182 19.6059 15.3444C19.9262 16.1952 19.7593 17.1593 18.9888 17.6915C18.5419 18 17.903 18 16.625 18H12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 6V5C12 3.5 11.5 2 9.5 2C7.5 2 7 3.5 7 5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15 4C15.933 4 16.3657 4.02054 16.6226 4.1918C17.2285 4.59553 17.4045 5.43715 17.2021 6.13611" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-brand-primary">Plantopia</span>
                        </NavLink>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-1">
                            <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Home</NavLink>
                            <NavLink to="/plants" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Plant Guide</NavLink>
                            <NavLink to="/create-room" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Get Suggestion</NavLink>
                            <NavLink to="/reminders" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Reminders</NavLink>
                            
                            {/* Shop Dropdown */}
                            <div className="relative" ref={shopRef}>
                                <button onClick={toggleShop} className={navLinkClasses}>Shop</button>
                                {isShopOpen && (
                                    <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white/95 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-20 backdrop-blur-sm">
                                        <a href="https://www.thesill.com/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-brand-text-main hover:bg-brand-secondary/70 transition-colors">The Sill</a>
                                        <a href="https://bloomscape.com/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-brand-text-main hover:bg-brand-secondary/70 transition-colors">Bloomscape</a>
                                        <a href="https://www.ugaoo.com/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-brand-text-main hover:bg-brand-secondary/70 transition-colors">Ugaoo (India)</a>
                                        <a href="https://nurserylive.com/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-brand-text-main hover:bg-brand-secondary/70 transition-colors">Nurserylive (India)</a>
                                    </div>
                                )}
                            </div>
                            
                            {/* Contact Dropdown */}
                            <div className="relative" ref={contactRef}>
                                <button onClick={toggleContact} className={navLinkClasses}>Contact</button>
                                {isContactOpen && (
                                    <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white/95 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-20 backdrop-blur-sm">
                                        <span className="block px-4 py-2 text-sm text-brand-text-main">📞 7768991597</span>
                                        <a href="mailto:nehamhatre384@gmail.com" className="block w-full text-left px-4 py-2 text-sm text-brand-text-main hover:bg-brand-secondary/70 transition-colors">✉️ nehamhatre384@gmail.com</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} type="button" className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-brand-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            {!isMobileMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink to="/" onClick={closeAllMenus} className={({ isActive }) => `block ${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Home</NavLink>
                        <NavLink to="/plants" onClick={closeAllMenus} className={({ isActive }) => `block ${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Plant Guide</NavLink>
                        <NavLink to="/create-room" onClick={closeAllMenus} className={({ isActive }) => `block ${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Get Suggestion</NavLink>
                        <NavLink to="/reminders" onClick={closeAllMenus} className={({ isActive }) => `block ${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Reminders</NavLink>

                        <div className="border-t border-gray-200 pt-3 mt-3">
                            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Shop</h3>
                             <a href="https://www.thesill.com/" target="_blank" rel="noopener noreferrer" className={`block ${navLinkClasses}`}>The Sill</a>
                             <a href="https://bloomscape.com/" target="_blank" rel="noopener noreferrer" className={`block ${navLinkClasses}`}>Bloomscape</a>
                             <a href="https://www.ugaoo.com/" target="_blank" rel="noopener noreferrer" className={`block ${navLinkClasses}`}>Ugaoo (India)</a>
                             <a href="https://nurserylive.com/" target="_blank" rel="noopener noreferrer" className={`block ${navLinkClasses}`}>Nurserylive (India)</a>
                        </div>
                         <div className="border-t border-gray-200 pt-3 mt-3">
                            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Contact</h3>
                            <span className="block px-3 py-2 text-base font-medium text-brand-text-main">📞 7768991597</span>
                            <a href="mailto:nehamhatre384@gmail.com" className={`block ${navLinkClasses}`}>✉️ Email Us</a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;