import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Obstacle {
  id: number;
  x: number;
  height: number;
  type: 'cafe' | 'hotel' | 'tower';
}

const DroneGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [droneY, setDroneY] = useState(240); // Start on ground
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  const GAME_HEIGHT = 300;
  const GAME_WIDTH = 600;
  const DRONE_SIZE = 20;
  const GROUND_HEIGHT = 240; // Ground level - adjusted for drone positioning
  const GRAVITY = 0.8;
  const JUMP_FORCE = -15;
  const OBSTACLE_WIDTH = 20;
  const OBSTACLE_HEIGHT = 40;
  const OBSTACLE_SPEED = 4;

  const jump = useCallback(() => {
    if (!gameOver && !isJumping) {
      setVelocity(JUMP_FORCE);
      setIsJumping(true);
      if (!isPlaying) {
        setIsPlaying(true);
      }
    }
  }, [gameOver, isJumping, isPlaying]);

  const resetGame = useCallback(() => {
    setDroneY(GROUND_HEIGHT);
    setVelocity(0);
    setObstacles([]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(false);
    setIsJumping(false);
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
      
      // Reduce collision area by 40% on all sides for more forgiving gameplay
      const collisionReduction = {
        width: obstacleWidth * 0.4,
        height: obstacle.height * 0.4
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

  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold text-black font-mono mb-4">
          EASTER EGG: DRONE RUNNER
        </h3>
        <p className="text-gray-600 font-mono mb-6">
          Press SPACE or click to make the drone jump over obstacles!
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
            {/* Ground line */}
            <div 
              className="absolute w-full border-t-2 border-green-800 bg-green-300"
              style={{ 
                top: GROUND_HEIGHT, 
                height: GAME_HEIGHT - GROUND_HEIGHT 
              }}
            />
            
            {/* Clouds */}
            <div className="absolute top-4 left-20 w-8 h-4 bg-white rounded-full opacity-60"></div>
            <div className="absolute top-12 right-32 w-6 h-3 bg-white rounded-full opacity-60"></div>
            <div className="absolute top-6 right-64 w-10 h-5 bg-white rounded-full opacity-60"></div>
            
            {/* Drone */}
            <motion.div
              className="absolute bg-orange-500 border-2 border-black"
              style={{
                left: 50,
                top: droneY,
                width: DRONE_SIZE,
                height: DRONE_SIZE,
              }}
              animate={{ rotate: isJumping ? -15 : 0 }}
              transition={{ duration: 0.1 }}
            >
              {/* Drone body */}
              <div className="w-full h-full relative">
                <div className="absolute inset-1 bg-orange-600"></div>
                {/* Propellers */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-black rounded-full"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-black rounded-full"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-black rounded-full"></div>
              </div>
            </motion.div>

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
                  <div className="text-sm font-mono">PRESS SPACE TO JUMP AND START</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-xs text-gray-500 font-mono">
            Use SPACE key or click to make the drone jump over obstacles
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneGame;