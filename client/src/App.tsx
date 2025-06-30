import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Programs from './components/Programs';
import Portfolio from './components/Portfolio';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-green-500 font-mono">
      <Header />
      <Hero />
      <Programs />
      <Portfolio />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;