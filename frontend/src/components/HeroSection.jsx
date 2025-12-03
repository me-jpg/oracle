import React from 'react';

export function HeroSection() {
  return (
    <div className="mb-16 space-y-8">
      {/* Subtle animated background accent */}
      <div className="relative">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative">
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            Discovery Awaits...
          </h2>
          
        </div>
      </div>
    </div>
  );
}
