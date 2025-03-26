
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blue-50/50">
      <Header />
      <main className="flex-grow pt-4">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
