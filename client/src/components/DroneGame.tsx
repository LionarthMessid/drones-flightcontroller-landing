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
  const [droneY, setDroneY] = useState(inModal ? 390 : 260); // Start on ground
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [jumpsRemaining, setJumpsRemaining] = useState(2);

  const GAME_HEIGHT = inModal ? 450 : 300;
  const GAME_WIDTH = inModal ? 900 : 600;
  const DRONE_SIZE = inModal ? 50 : 35; // Larger drone in modal
  const GROUND_HEIGHT = inModal ? 390 : 260; // Ground level - adjusted for proper drone positioning
  const GRAVITY = 0.8;
  const JUMP_FORCE = -15;
  const OBSTACLE_WIDTH = 20;
  const OBSTACLE_HEIGHT = 40;
  const OBSTACLE_SPEED = 4;

  // Initialize obstacles
  useEffect(() => {
    const initialObstacles: Obstacle[] = [];
    for (let i = 0; i < 5; i++) {
      const types: ('cafe' | 'hotel' | 'tower')[] = ['cafe', 'hotel', 'tower'];
      initialObstacles.push({
        id: i,
        x: GAME_WIDTH + i * 200,
        height: 40,
        type: types[Math.floor(Math.random() * types.length)]
      });
    }
    setObstacles(initialObstacles);
  }, [GAME_WIDTH]);

  const jump = useCallback(() => {
    if (gameOver) return;
    
    if (jumpsRemaining > 0) {
      setVelocity(JUMP_FORCE);
      setIsJumping(true);
      setJumpsRemaining(prev => prev - 1);
      setTimeout(() => setIsJumping(false), 300);
    }
  }, [gameOver, jumpsRemaining, JUMP_FORCE]);

  const handleJump = useCallback(() => {
    if (!isPlaying) {
      setIsPlaying(true);
      setGameOver(false);
      setScore(0);
      setVelocity(0);
      setDroneY(GROUND_HEIGHT);
      setJumpsRemaining(2);
    } else {
      jump();
    }
  }, [isPlaying, jump, GROUND_HEIGHT]);

  const resetGame = useCallback(() => {
    setIsPlaying(false);
    setGameOver(false);
    setScore(0);
    setVelocity(0);
    setDroneY(GROUND_HEIGHT);
    setJumpsRemaining(2);
    
    // Reset obstacles
    const newObstacles: Obstacle[] = [];
    for (let i = 0; i < 5; i++) {
      const types: ('cafe' | 'hotel' | 'tower')[] = ['cafe', 'hotel', 'tower'];
      newObstacles.push({
        id: Date.now() + i,
        x: GAME_WIDTH + i * 200,
        height: 40,
        type: types[Math.floor(Math.random() * types.length)]
      });
    }
    setObstacles(newObstacles);
  }, [GAME_WIDTH, GROUND_HEIGHT]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleJump]);

  // Game physics
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = setInterval(() => {
      // Update drone position
      setVelocity(prev => prev + GRAVITY);
      setDroneY(prev => {
        const newY = prev + velocity;
        
        // Check if drone hits ground
        if (newY >= GROUND_HEIGHT) {
          setJumpsRemaining(2); // Reset jumps when touching ground
          return GROUND_HEIGHT;
        }
        
        // Check if drone hits ceiling
        if (newY <= 0) {
          return 0;
        }
        
        return newY;
      });

      // Move obstacles
      setObstacles(prev => 
        prev.map(obstacle => ({
          ...obstacle,
          x: obstacle.x - OBSTACLE_SPEED
        })).filter(obstacle => obstacle.x > -OBSTACLE_WIDTH)
      );

      // Add new obstacles
      setObstacles(prev => {
        const lastObstacle = prev[prev.length - 1];
        if (!lastObstacle || lastObstacle.x < GAME_WIDTH - 150) {
          const types: ('cafe' | 'hotel' | 'tower')[] = ['cafe', 'hotel', 'tower'];
          return [...prev, {
            id: Date.now(),
            x: GAME_WIDTH,
            height: 40,
            type: types[Math.floor(Math.random() * types.length)]
          }];
        }
        return prev;
      });

      // Update score
      setScore(prev => prev + 1);
    }, 16);

    return () => clearInterval(gameLoop);
  }, [isPlaying, gameOver, velocity, GRAVITY, GROUND_HEIGHT, GAME_WIDTH, OBSTACLE_SPEED, OBSTACLE_WIDTH]);

  // Collision detection
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    obstacles.forEach(obstacle => {
      const droneLeft = 50;
      const droneRight = 50 + DRONE_SIZE;
      const droneTop = droneY;
      const droneBottom = droneY + DRONE_SIZE;

      // Get building dimensions based on type
      let buildingWidth = 60;
      let buildingHeight = 60;
      
      if (obstacle.type === 'hotel') {
        buildingWidth = 80;
        buildingHeight = 80;
      } else if (obstacle.type === 'cafe') {
        buildingWidth = 40;
        buildingHeight = 40;
      } else if (obstacle.type === 'tower') {
        buildingWidth = 60;
        buildingHeight = 100;
      }

      const obstacleLeft = obstacle.x;
      const obstacleRight = obstacle.x + buildingWidth;
      const obstacleTop = GROUND_HEIGHT - buildingHeight;
      const obstacleBottom = GROUND_HEIGHT;

      // Reduce collision box by 40% for more forgiving gameplay
      const collisionReduction = 0.4;
      const reducedDroneLeft = droneLeft + (DRONE_SIZE * collisionReduction / 2);
      const reducedDroneRight = droneRight - (DRONE_SIZE * collisionReduction / 2);
      const reducedDroneTop = droneTop + (DRONE_SIZE * collisionReduction / 2);
      const reducedDroneBottom = droneBottom - (DRONE_SIZE * collisionReduction / 2);

      const reducedObstacleLeft = obstacleLeft + (buildingWidth * collisionReduction / 2);
      const reducedObstacleRight = obstacleRight - (buildingWidth * collisionReduction / 2);
      const reducedObstacleTop = obstacleTop + (buildingHeight * collisionReduction / 2);
      const reducedObstacleBottom = obstacleBottom - (buildingHeight * collisionReduction / 2);

      if (
        reducedDroneRight > reducedObstacleLeft &&
        reducedDroneLeft < reducedObstacleRight &&
        reducedDroneBottom > reducedObstacleTop &&
        reducedDroneTop < reducedObstacleBottom
      ) {
        setGameOver(true);
        setIsPlaying(false);
      }
    });
  }, [droneY, obstacles, isPlaying, gameOver, DRONE_SIZE, GROUND_HEIGHT]);

  const containerClass = inModal 
    ? "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" 
    : "py-16 bg-gray-100";
  
  const contentClass = inModal 
    ? "bg-white p-6 rounded-lg border-4 border-black max-w-6xl mx-4 relative" 
    : "max-w-4xl mx-auto px-4";

  const gameContent = (
    <>
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
      
      {!inModal && onPlayInWindow && (
        <button
          onClick={onPlayInWindow}
          className="mb-6 bg-orange-500 text-white px-6 py-3 border-2 border-black font-bold text-lg hover:bg-orange-600 transition-colors"
        >
          🎮 PLAY IN WINDOW
        </button>
      )}
      
      <div className="inline-block bg-white border-4 border-black p-4">
        <div className="flex justify-between items-center mb-4">
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
          
          {/* Obstacles */}
          {obstacles.map((obstacle) => {
            let buildingWidth = 60;
            let buildingHeight = 60;
            let imagePath = '/game-assets/tower.png';
            
            if (obstacle.type === 'hotel') {
              buildingWidth = 80;
              buildingHeight = 80;
              imagePath = '/game-assets/hotel.png';
            } else if (obstacle.type === 'cafe') {
              buildingWidth = 40;
              buildingHeight = 40;
              imagePath = '/game-assets/cafe.png';
            } else if (obstacle.type === 'tower') {
              buildingWidth = 60;
              buildingHeight = 100;
              imagePath = '/game-assets/tower.png';
            }
            
            return (
              <img
                key={obstacle.id}
                src={imagePath}
                alt={obstacle.type}
                className="absolute"
                style={{
                  left: obstacle.x,
                  top: GROUND_HEIGHT - buildingHeight,
                  width: buildingWidth,
                  height: buildingHeight,
                  objectFit: 'contain',
                }}
              />
            );
          })}
          
          {/* Game over overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
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
    </>
  );

  return (
    <div className={containerClass}>
      {inModal ? (
        <motion.div 
          className={`${contentClass} text-center`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {gameContent}
        </motion.div>
      ) : (
        <div className={`${contentClass} text-center`}>
          {gameContent}
        </div>
      )}
    </div>
  );
};

export default DroneGame;