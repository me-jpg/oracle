import React, { useEffect, useState, useRef } from 'react';

export function DVDScreensaver() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [velocity, setVelocity] = useState({ x: 2, y: 2 });
  const [color, setColor] = useState('#a855f7');
  const containerRef = useRef(null);

  const colors = ['#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  useEffect(() => {
    // Random starting velocity
    setVelocity({
      x: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 2 + 1),
      y: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 2 + 1)
    });
  }, []);

  useEffect(() => {
    const animate = () => {
      setPosition(prev => {
        if (!containerRef.current) return prev;

        const container = containerRef.current.getBoundingClientRect();
        const boxSize = 120;
        
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;
        let newVelX = velocity.x;
        let newVelY = velocity.y;
        let hitCorner = false;

        // Check boundaries and bounce
        if (newX <= 0 || newX >= container.width - boxSize) {
          newVelX = -velocity.x;
          newX = newX <= 0 ? 0 : container.width - boxSize;
          
          // Check if hitting corner
          if ((newY <= 0 || newY >= container.height - boxSize)) {
            hitCorner = true;
          }
        }

        if (newY <= 0 || newY >= container.height - boxSize) {
          newVelY = -velocity.y;
          newY = newY <= 0 ? 0 : container.height - boxSize;
          
          // Check if hitting corner
          if ((newX <= 0 || newX >= container.width - boxSize)) {
            hitCorner = true;
          }
        }

        // Change color on bounce
        if (newVelX !== velocity.x || newVelY !== velocity.y) {
          setColor(colors[Math.floor(Math.random() * colors.length)]);
          
          if (hitCorner) {
            // Flash effect on corner hit
            setColor('#ffffff');
            setTimeout(() => setColor(colors[Math.floor(Math.random() * colors.length)]), 100);
          }
        }

        if (newVelX !== velocity.x || newVelY !== velocity.y) {
          setVelocity({ x: newVelX, y: newVelY });
        }

        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(animate, 16); // ~60fps
    return () => clearInterval(interval);
  }, [velocity]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden"
      style={{ zIndex: 9999 }}
    >
      {/* DVD Box */}
      <div
        className="absolute transition-all duration-0"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '120px',
          height: '120px'
        }}
      >
        <div 
          className="w-full h-full rounded-xl shadow-2xl flex items-center justify-center text-white font-bold text-xl border-4 backdrop-blur-sm"
          style={{
            backgroundColor: `${color}40`,
            borderColor: color,
            boxShadow: `0 0 40px ${color}80, 0 0 80px ${color}40`
          }}
        >
          <div className="text-center">
            <div className="text-4xl mb-2">⏳</div>
            <div style={{ color: color }}>ORACLE</div>
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
        <p className="text-white/60 text-sm mb-2">AI is analyzing thousands of titles...</p>
        <div className="flex items-center gap-2 justify-center">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
}

