import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { HeroSection } from './components/sections/Hero/HeroSection';
import { AboutSection } from './components/sections/About/AboutSection';
import { WorksSection } from './components/sections/Works/WorksSection';
import { ServicesSection } from './components/sections/Services/ServicesSection';
import { ContactSection } from './components/sections/Contact/ContactSection';
import { Preloader } from './components/animations/Preloader/Preloader';
import { useLenis } from './hooks/useLenis';

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize luxury inertia smooth scrolling
  useLenis(true);

  return (
    <>
      {/* Intro Architectural Preloader Screen */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Main Experience Layout */}
      <Layout>
        {/* Hero Section receives isLoaded so floating icons pop out strictly after preloader */}
        <HeroSection isLoaded={isLoaded} />
        <AboutSection />
        <WorksSection />
        <ServicesSection />
        <ContactSection />
      </Layout>
    </>
  );
}

export default App;
