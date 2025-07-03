import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Obstacle {
  id: number;
  x: number;
  height: number;
  gap: number;
}

const DroneGame = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'gameOver'>('waiting');
  const [score, setScore] = useState(0);
  const [droneY, setDroneY] = useState(200);
  const [velocity, setVelocity] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [gameSpeed, setGameSpeed] = useState(3);

  const gameHeight = 400;
  const gameWidth = 600;
  const droneSize = 30;
  const gravity = 0.6;
  const jumpStrength = -12;
  const obstacleWidth = 60;
  const obstacleGap = 150;

  // Reset game
  const resetGame = useCallback(() => {
    setGameState('waiting');
    setScore(0);
    setDroneY(200);
    setVelocity(0);
    setObstacles([]);
    setGameSpeed(3);
  }, []);

  // Start game
  const startGame = useCallback(() => {
    setGameState('playing');
    setDroneY(200);
    setVelocity(0);
    setObstacles([]);
    setScore(0);
  }, []);

  // Jump/Hover action
  const jump = useCallback(() => {
    if (gameState === 'playing') {
      setVelocity(jumpStrength);
    } else if (gameState === 'waiting') {
      startGame();
    } else if (gameState === 'gameOver') {
      resetGame();
    }
  }, [gameState, startGame, resetGame]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };

    if (isVisible) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isVisible, jump]);

  // Game physics
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      // Update drone position
      setDroneY(prev => {
        const newY = prev + velocity;
        return Math.max(0, Math.min(gameHeight - droneSize, newY));
      });

      // Update velocity
      setVelocity(prev => prev + gravity);

      // Move obstacles
      setObstacles(prev => {
        const updated = prev.map(obstacle => ({
          ...obstacle,
          x: obstacle.x - gameSpeed
        })).filter(obstacle => obstacle.x > -obstacleWidth);

        // Add new obstacles
        if (updated.length === 0 || updated[updated.length - 1].x < gameWidth - 300) {
          const newObstacle: Obstacle = {
            id: Date.now(),
            x: gameWidth,
            height: Math.random() * 150 + 50,
            gap: obstacleGap
          };
          updated.push(newObstacle);
        }

        return updated;
      });

      // Update score
      setScore(prev => prev + 1);

      // Increase game speed gradually
      setGameSpeed(prev => Math.min(prev + 0.001, 6));
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameState, velocity, gameSpeed]);

  // Collision detection
  useEffect(() => {
    if (gameState !== 'playing') return;

    // Check ground and ceiling collision
    if (droneY <= 0 || droneY >= gameHeight - droneSize) {
      setGameState('gameOver');
      return;
    }

    // Check obstacle collision
    const droneLeft = 50;
    const droneRight = droneLeft + droneSize;
    const droneTop = droneY;
    const droneBottom = droneY + droneSize;

    for (const obstacle of obstacles) {
      const obstacleLeft = obstacle.x;
      const obstacleRight = obstacle.x + obstacleWidth;

      if (droneRight > obstacleLeft && droneLeft < obstacleRight) {
        // Check if drone is in the gap
        const gapTop = obstacle.height;
        const gapBottom = obstacle.height + obstacle.gap;

        if (droneTop < gapTop || droneBottom > gapBottom) {
          setGameState('gameOver');
          return;
        }
      }
    }
  }, [droneY, obstacles, gameState]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white border-4 border-black rounded-lg p-6 relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Game Title */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-black">DRONE FLIGHT</h2>
            <p className="text-sm text-gray-600 font-mono">PRESS SPACE TO FLY</p>
          </div>

          {/* Game Canvas */}
          <div
            className="relative bg-gradient-to-b from-blue-200 to-blue-100 border-2 border-black overflow-hidden cursor-pointer"
            style={{ width: gameWidth, height: gameHeight }}
            onClick={jump}
          >
            {/* Background Elements */}
            <div className="absolute inset-0">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-8 h-8 bg-white rounded-full opacity-30"
                  style={{
                    left: `${(i * 80) % gameWidth}px`,
                    top: `${50 + (i * 40) % 200}px`,
                    transform: `translateX(${-score * 0.1}px)`
                  }}
                />
              ))}
            </div>

            {/* Obstacles */}
            {obstacles.map(obstacle => (
              <div key={obstacle.id}>
                {/* Top obstacle */}
                <div
                  className="absolute bg-green-600 border-2 border-black"
                  style={{
                    left: obstacle.x,
                    top: 0,
                    width: obstacleWidth,
                    height: obstacle.height
                  }}
                />
                {/* Bottom obstacle */}
                <div
                  className="absolute bg-green-600 border-2 border-black"
                  style={{
                    left: obstacle.x,
                    top: obstacle.height + obstacle.gap,
                    width: obstacleWidth,
                    height: gameHeight - obstacle.height - obstacle.gap
                  }}
                />
              </div>
            ))}

            {/* Drone */}
            <motion.div
              className="absolute bg-orange-500 border-2 border-black rounded-full flex items-center justify-center"
              style={{
                left: 50,
                top: droneY,
                width: droneSize,
                height: droneSize
              }}
              animate={{
                rotate: velocity * 2
              }}
            >
              <div className="w-2 h-2 bg-white rounded-full" />
            </motion.div>

            {/* Game Over Overlay */}
            {gameState === 'gameOver' && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 border-2 border-black rounded text-center">
                  <h3 className="text-xl font-bold text-black mb-2">CRASHED!</h3>
                  <p className="text-gray-600 font-mono mb-4">SCORE: {Math.floor(score / 10)}</p>
                  <button
                    onClick={resetGame}
                    className="bg-orange-500 text-white px-4 py-2 border-2 border-black font-bold hover:bg-orange-600"
                  >
                    TRY AGAIN
                  </button>
                </div>
              </div>
            )}

            {/* Start Screen */}
            {gameState === 'waiting' && (
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="bg-white p-6 border-2 border-black rounded text-center">
                  <h3 className="text-xl font-bold text-black mb-2">READY TO FLY?</h3>
                  <p className="text-gray-600 font-mono mb-4">CLICK OR PRESS SPACE</p>
                </div>
              </div>
            )}
          </div>

          {/* Score Display */}
          <div className="mt-4 text-center">
            <div className="text-lg font-bold text-black font-mono">
              SCORE: {Math.floor(score / 10)}
            </div>
            <div className="text-sm text-gray-600 font-mono">
              SPEED: {gameSpeed.toFixed(1)}x
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DroneGame;