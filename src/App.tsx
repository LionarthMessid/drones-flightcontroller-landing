import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Programs from './components/Programs';
import Portfolio from './components/Portfolio';
import Media from './components/Media';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <Header />
      <Hero />
      <Programs />
      <Portfolio />
      <Media />
      <Testimonials />
      <Team />
      <FAQ />
      <Blog />
      <Footer />
    </div>
  );
}

export default App;