import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DroneGame from '../components/DroneGame';

const GamePage = () => {
  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <Header />
      <div className="pt-16"> {/* Add padding to account for fixed header */}
        <DroneGame />
      </div>
      <Footer />
    </div>
  );
};

export default GamePage;