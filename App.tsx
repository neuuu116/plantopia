import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PlantInfoPage from './pages/PlantInfoPage';
import RoomCreatorPage from './pages/RoomCreatorPage';
import SuggestionsPage from './pages/SuggestionsPage';
import RemindersPage from './pages/RemindersPage';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-brand-text-main">
      <HashRouter>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/plants" element={<PlantInfoPage />} />
            <Route path="/create-room" element={<RoomCreatorPage />} />
            <Route path="/suggestions" element={<SuggestionsPage />} />
            <Route path="/reminders" element={<RemindersPage />} />
          </Routes>
        </main>
        <Footer />
      </HashRouter>
    </div>
  );
};

export default App;
