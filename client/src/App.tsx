import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'wouter';
import Header from './components/Header';
import Hero from './components/Hero';
import CompanyMission from './components/CompanyMission';
import ProductGlimpse from './components/ProductGlimpse';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Updates from './components/Updates';
import Roadmap from './components/Roadmap';
import DroneGameWrapper from './components/DroneGameWrapper';
import Footer from './components/Footer';
import ControllerBoard from './pages/ControllerBoard';
import SimulationDemo from './pages/SimulationDemo';
import GamePage from './pages/GamePage';

// Scroll Progress Bar Component
const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <ScrollProgressBar />
      <Header />
      <Hero />
      <CompanyMission />
      <ProductGlimpse />
      <Team />
      <FAQ />
      <Updates />
      <Roadmap />
      <DroneGameWrapper />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/game" component={GamePage} />
      <Route path="/controller" component={ControllerBoard} />
      <Route path="/simulation" component={SimulationDemo} />
      {/* Legacy routes for backward compatibility */}
      <Route path="/controller-board" component={ControllerBoard} />
      <Route path="/simulation-demo" component={SimulationDemo} />
    </Switch>
  );
}

export default App;