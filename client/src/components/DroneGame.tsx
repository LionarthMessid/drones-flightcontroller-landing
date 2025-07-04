import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Obstacle {
  id: number;
  x: number;
  height: number;
  type: 'cafe' | 'hotel' | 'tower';
}

interface DroneGameProps {
  inModal?: boolean;
  onClose?: () => void;
  onPlayInWindow?: () => void;
}

const DroneGame = ({ inModal = false, onClose, onPlayInWindow }: DroneGameProps = {}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [droneY, setDroneY] = useState(260); // Start on ground
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [jumpsRemaining, setJumpsRemaining] = useState(2);

  const GAME_HEIGHT = 300;
  const GAME_WIDTH = 600;
  const DRONE_SIZE = 35; // Increased size for the pixel art drone
  const GROUND_HEIGHT = 260; // Ground level - adjusted for proper drone positioning
  const GRAVITY = 0.8;
  const JUMP_FORCE = -15;
  const OBSTACLE_WIDTH = 20;
  const OBSTACLE_HEIGHT = 40;
  const OBSTACLE_SPEED = 4;

  const jump = useCallback(() => {
    if (!gameOver && jumpsRemaining > 0) {
      setVelocity(JUMP_FORCE);
      setIsJumping(true);
      setJumpsRemaining(prev => prev - 1);
      if (!isPlaying) {
        setIsPlaying(true);
      }
    }
  }, [gameOver, jumpsRemaining, isPlaying]);

  const resetGame = useCallback(() => {
    setDroneY(GROUND_HEIGHT);
    setVelocity(0);
    setObstacles([]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(false);
    setIsJumping(false);
    setJumpsRemaining(2);
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (gameOver) {
          resetGame();
        } else {
          jump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump, gameOver, resetGame]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = setInterval(() => {
      // Update drone position
      setVelocity(prev => prev + GRAVITY);
      setDroneY(prev => {
        const newY = prev + velocity;
        
        // Check if drone lands on ground
        if (newY >= GROUND_HEIGHT) {
          setIsJumping(false);
          setVelocity(0);
          setJumpsRemaining(2); // Reset double jump when landing
          return GROUND_HEIGHT;
        }
        
        // Check ceiling collision
        if (newY < 0) {
          return 0;
        }
        
        return newY;
      });

      // Update obstacles
      setObstacles(prev => {
        const updated = prev.map(obstacle => ({
          ...obstacle,
          x: obstacle.x - OBSTACLE_SPEED
        }));

        // Remove off-screen obstacles and add score
        const onScreen = updated.filter(obstacle => {
          if (obstacle.x + OBSTACLE_WIDTH < 0) {
            setScore(s => s + 1);
            return false;
          }
          return true;
        });

        // Add new obstacles (ground obstacles) - reduced gap
        if (onScreen.length === 0 || onScreen[onScreen.length - 1].x < GAME_WIDTH - 200) {
          const buildingTypes: Array<'cafe' | 'hotel' | 'tower'> = ['cafe', 'hotel', 'tower'];
          const randomType = buildingTypes[Math.floor(Math.random() * buildingTypes.length)];
          
          // Different heights for different building types
          let buildingHeight = OBSTACLE_HEIGHT;
          if (randomType === 'cafe') {
            buildingHeight = 60; // Increased cafe size
          } else if (randomType === 'hotel') {
            buildingHeight = 90; // Large hotel
          } else if (randomType === 'tower') {
            buildingHeight = 110; // Bigger tower
          }
          
          onScreen.push({
            id: Date.now(),
            x: GAME_WIDTH,
            height: buildingHeight,
            type: randomType
          });
        }

        return onScreen;
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [isPlaying, gameOver, velocity]);

  // Collision detection
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    obstacles.forEach(obstacle => {
      const droneLeft = 50;
      const droneRight = droneLeft + DRONE_SIZE;
      const droneTop = droneY;
      const droneBottom = droneY + DRONE_SIZE;

      const obstacleWidth = obstacle.type === 'cafe' ? 50 : obstacle.type === 'tower' ? 80 : 70;
      
      // Reduce collision area by 50% on all sides for more forgiving gameplay
      const collisionReduction = {
        width: obstacleWidth * 0.5,
        height: obstacle.height * 0.5
      };
      
      const obstacleLeft = obstacle.x + collisionReduction.width / 2;
      const obstacleRight = obstacle.x + obstacleWidth - collisionReduction.width / 2;
      const obstacleTop = GROUND_HEIGHT - obstacle.height + collisionReduction.height / 2;
      const obstacleBottom = GROUND_HEIGHT - collisionReduction.height / 2;

      // Check collision with ground obstacle (reduced collision area)
      if (
        droneRight > obstacleLeft &&
        droneLeft < obstacleRight &&
        droneBottom > obstacleTop &&
        droneTop < obstacleBottom
      ) {
        setGameOver(true);
      }
    });
  }, [droneY, obstacles, isPlaying, gameOver]);

  const containerClass = inModal 
    ? "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" 
    : "py-16 bg-gray-100";
  
  const contentClass = inModal 
    ? "bg-white p-6 rounded-lg border-4 border-black max-w-4xl mx-4 relative" 
    : "max-w-4xl mx-auto px-4";

  return (
    <div className={containerClass}>
      <div className={`${contentClass} text-center`}>
        {inModal && onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 border-2 border-black font-bold hover:bg-red-600 text-sm"
          >
            ✕
          </button>
        )}
        <h3 className="text-2xl font-bold text-black font-mono mb-4">
          {inModal ? "DRONE RUNNER" : "EASTER EGG: DRONE RUNNER"}
        </h3>
        <p className="text-gray-600 font-mono mb-6">
          Press SPACE or click to jump! You can double jump in mid-air!
        </p>
        

        
        <div className="inline-block bg-white border-4 border-black p-4">
          <div className="mb-4 flex justify-between items-center">
            <div className="text-lg font-bold font-mono">
              SCORE: {score}
            </div>
            {gameOver && (
              <button
                onClick={resetGame}
                className="bg-orange-500 text-white px-4 py-2 border-2 border-black font-bold text-sm hover:bg-orange-600"
              >
                RESTART
              </button>
            )}
          </div>
          
          <div
            className="relative bg-gradient-to-b from-blue-200 to-green-200 border-2 border-black cursor-pointer"
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
            onClick={gameOver ? resetGame : jump}
          >
            {/* Sun */}
            <div className="absolute top-8 right-16 w-12 h-12 bg-yellow-400 border-2 border-yellow-500 rounded-full">
              {/* Sun rays */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-yellow-400"></div>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-yellow-400"></div>
              <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 h-0.5 w-4 bg-yellow-400"></div>
              <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 h-0.5 w-4 bg-yellow-400"></div>
              <div className="absolute -top-2 -left-2 w-0.5 h-3 bg-yellow-400 transform rotate-45 origin-bottom"></div>
              <div className="absolute -top-2 -right-2 w-0.5 h-3 bg-yellow-400 transform -rotate-45 origin-bottom"></div>
              <div className="absolute -bottom-2 -left-2 w-0.5 h-3 bg-yellow-400 transform -rotate-45 origin-top"></div>
              <div className="absolute -bottom-2 -right-2 w-0.5 h-3 bg-yellow-400 transform rotate-45 origin-top"></div>
            </div>
            
            {/* Ground line */}
            <div 
              className="absolute w-full border-t-2 border-green-800 bg-green-300"
              style={{ 
                top: GROUND_HEIGHT, 
                height: GAME_HEIGHT - GROUND_HEIGHT 
              }}
            />
            
            {/* Clouds */}
            <div className="absolute top-4 left-20 w-8 h-4 bg-white rounded-full opacity-80 shadow-sm"></div>
            <div className="absolute top-12 right-32 w-6 h-3 bg-white rounded-full opacity-80 shadow-sm"></div>
            <div className="absolute top-6 right-64 w-10 h-5 bg-white rounded-full opacity-80 shadow-sm"></div>
            <div className="absolute top-16 left-60 w-7 h-3 bg-white rounded-full opacity-70 shadow-sm"></div>
            <div className="absolute top-8 left-80 w-5 h-2 bg-white rounded-full opacity-70 shadow-sm"></div>
            
            {/* Drone */}
            <motion.img
              src="/game-assets/drone.png"
              alt="drone"
              className="absolute"
              style={{
                left: 50,
                top: droneY,
                width: DRONE_SIZE,
                height: DRONE_SIZE,
                objectFit: 'contain',
              }}
              animate={{ rotate: isJumping ? -10 : 0 }}
              transition={{ duration: 0.15 }}
            />

            {/* Ground obstacles */}
            {obstacles.map(obstacle => {
              const buildingWidth = obstacle.type === 'cafe' ? 50 : obstacle.type === 'tower' ? 80 : 70; // Increased sizes
              return (
                <img
                  key={obstacle.id}
                  src={`/game-assets/${obstacle.type}.png`}
                  alt={obstacle.type}
                  className="absolute"
                  style={{
                    left: obstacle.x,
                    top: GROUND_HEIGHT - obstacle.height + 5, // Position 5px closer to ground to reduce gap
                    width: buildingWidth,
                    height: obstacle.height,
                    objectFit: 'contain',
                    objectPosition: 'bottom', // Align image to bottom to eliminate gap
                  }}
                />
              );
            })}

            {/* Game Over overlay */}
            {gameOver && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold font-mono mb-2">GAME OVER</div>
                  <div className="text-lg font-mono mb-4">FINAL SCORE: {score}</div>
                  <div className="text-sm font-mono">CLICK TO RESTART</div>
                </div>
              </div>
            )}

            {/* Start screen */}
            {!isPlaying && !gameOver && (
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-xl font-bold font-mono mb-2">DRONE RUNNER</div>
                  <div className="text-sm font-mono">PRESS SPACE TO JUMP! DOUBLE JUMP AVAILABLE!</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-xs text-gray-500 font-mono">
            Use SPACE key or click to jump. Double jump available in mid-air!
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneGame;