import React, { useEffect, useState } from 'react';

const BOX_SIZE = 80; // Size of the bouncing box
const CONTAINER_WIDTH = 500;
const CONTAINER_HEIGHT = 300;

export function DVDScreensaver() {
  const [position, setPosition] = useState({ 
    x: Math.random() * (CONTAINER_WIDTH - BOX_SIZE), 
    y: Math.random() * (CONTAINER_HEIGHT - BOX_SIZE) 
  });
  const [velocity, setVelocity] = useState({ 
    x: 2.5, 
    y: 2.5 
  });
  const [color, setColor] = useState('#a855f7');

  const colors = ['#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  useEffect(() => {
    // Random starting velocity direction
    const randomVel = {
      x: (Math.random() > 0.5 ? 1 : -1) * 2.5,
      y: (Math.random() > 0.5 ? 1 : -1) * 2.5
    };
    setVelocity(randomVel);
  }, []);

  useEffect(() => {
    const animate = () => {
      setPosition(prev => {
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;
        let newVelX = velocity.x;
        let newVelY = velocity.y;
        let bounced = false;

        // Bounce off left/right walls
        if (newX <= 0) {
          newX = 0;
          newVelX = Math.abs(velocity.x);
          bounced = true;
        } else if (newX >= CONTAINER_WIDTH - BOX_SIZE) {
          newX = CONTAINER_WIDTH - BOX_SIZE;
          newVelX = -Math.abs(velocity.x);
          bounced = true;
        }

        // Bounce off top/bottom walls
        if (newY <= 0) {
          newY = 0;
          newVelY = Math.abs(velocity.y);
          bounced = true;
        } else if (newY >= CONTAINER_HEIGHT - BOX_SIZE) {
          newY = CONTAINER_HEIGHT - BOX_SIZE;
          newVelY = -Math.abs(velocity.y);
          bounced = true;
        }

        // Change color on bounce
        if (bounced) {
          const newColor = colors[Math.floor(Math.random() * colors.length)];
          setColor(newColor);
        }

        // Update velocity if changed
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
    <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
      {/* Fixed-size bouncing container */}
      <div 
        className="relative rounded-2xl border border-white/20 bg-black/60 backdrop-blur-sm overflow-hidden mb-6"
        style={{ 
          width: `${CONTAINER_WIDTH}px`, 
          height: `${CONTAINER_HEIGHT}px`,
          boxShadow: '0 0 40px rgba(168, 85, 247, 0.15), inset 0 0 60px rgba(168, 85, 247, 0.03)'
        }}
      >
        {/* Bouncing box - absolute positioned */}
        <div
          className="absolute"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: `${BOX_SIZE}px`,
            height: `${BOX_SIZE}px`,
            transition: 'none' // Remove any transitions for smooth animation
          }}
        >
          <div 
            className="w-full h-full rounded-lg flex items-center justify-center text-white font-bold border-2"
            style={{
              backgroundColor: `${color}30`,
              borderColor: color,
              boxShadow: `0 0 30px ${color}60, 0 0 60px ${color}30`
            }}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">⏳</div>
              <div className="text-xs font-bold" style={{ color: color }}>ORACLE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div className="text-center">
        <p className="text-white/70 text-sm font-semibold mb-3">AI is analyzing thousands of titles...</p>
        <div className="flex items-center gap-2 justify-center">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
}


