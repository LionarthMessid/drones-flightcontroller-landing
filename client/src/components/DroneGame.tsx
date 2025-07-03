import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Obstacle {
  id: number;
  x: number;
  height: number;
}

const DroneGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [droneY, setDroneY] = useState(150);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [velocity, setVelocity] = useState(0);

  const GAME_HEIGHT = 300;
  const GAME_WIDTH = 600;
  const DRONE_SIZE = 20;
  const GRAVITY = 0.6;
  const JUMP_FORCE = -12;
  const OBSTACLE_WIDTH = 30;
  const OBSTACLE_SPEED = 3;

  const jump = useCallback(() => {
    if (!gameOver) {
      setVelocity(JUMP_FORCE);
      if (!isPlaying) {
        setIsPlaying(true);
      }
    }
  }, [gameOver, isPlaying]);

  const resetGame = useCallback(() => {
    setDroneY(150);
    setVelocity(0);
    setObstacles([]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(false);
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
        // Check ground and ceiling collision
        if (newY > GAME_HEIGHT - DRONE_SIZE || newY < 0) {
          setGameOver(true);
          return prev;
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

        // Add new obstacles
        if (onScreen.length === 0 || onScreen[onScreen.length - 1].x < GAME_WIDTH - 200) {
          onScreen.push({
            id: Date.now(),
            x: GAME_WIDTH,
            height: Math.random() * 100 + 50
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

      const obstacleLeft = obstacle.x;
      const obstacleRight = obstacle.x + OBSTACLE_WIDTH;
      const obstacleTop = 0;
      const obstacleBottom = obstacle.height;

      // Check collision with top obstacle
      if (
        droneRight > obstacleLeft &&
        droneLeft < obstacleRight &&
        droneTop < obstacleBottom
      ) {
        setGameOver(true);
      }

      // Check collision with bottom obstacle (gap of 120px)
      const bottomObstacleTop = obstacle.height + 120;
      if (
        droneRight > obstacleLeft &&
        droneLeft < obstacleRight &&
        droneBottom > bottomObstacleTop
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
          Press SPACE or click to make the drone fly. Avoid the obstacles!
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
            className="relative bg-gradient-to-b from-blue-200 to-blue-300 border-2 border-black cursor-pointer"
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
            onClick={gameOver ? resetGame : jump}
          >
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
              animate={{ rotate: velocity * 2 }}
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

            {/* Obstacles */}
            {obstacles.map(obstacle => (
              <div key={obstacle.id}>
                {/* Top obstacle */}
                <div
                  className="absolute bg-gray-600 border-2 border-black"
                  style={{
                    left: obstacle.x,
                    top: 0,
                    width: OBSTACLE_WIDTH,
                    height: obstacle.height,
                  }}
                />
                {/* Bottom obstacle */}
                <div
                  className="absolute bg-gray-600 border-2 border-black"
                  style={{
                    left: obstacle.x,
                    top: obstacle.height + 120,
                    width: OBSTACLE_WIDTH,
                    height: GAME_HEIGHT - obstacle.height - 120,
                  }}
                />
              </div>
            ))}

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
                  <div className="text-sm font-mono">CLICK OR PRESS SPACE TO START</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-xs text-gray-500 font-mono">
            Use SPACE key or click to control the drone
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneGame;