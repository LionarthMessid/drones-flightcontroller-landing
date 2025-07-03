import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings, Zap, Wifi, Cpu, Code, Wind, Eye } from 'lucide-react';
import { useDrone } from '../lib/useDrone';
import { useWind } from '../lib/useWind';
import { useEnvironment } from '../lib/useEnvironment';
import { useEditor } from '../lib/useEditor';
import { compileCode } from '../lib/codeCompiler';
import { PIDController } from '../lib/pidController';
import { DronePhysics } from '../lib/dronePhysics';
import * as THREE from 'three';

const AdvancedDroneSimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [showWind, setShowWind] = useState(false);
  const [keys, setKeys] = useState<Record<string, boolean>>({});
  
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const pidControllerRef = useRef<PIDController | null>(null);
  const dronePhysicsRef = useRef<DronePhysics | null>(null);

  const { 
    position, 
    rotation, 
    velocity, 
    angularVelocity,
    pidParams,
    telemetry,
    updateDrone,
    updatePIDParams,
    setTelemetry,
    reset
  } = useDrone();

  const { getWindAtPosition, windSources, addWindSource, removeWindSource } = useWind();
  const { obstacles } = useEnvironment();
  const { code, setCode, error, setError, isCompiling, setIsCompiling } = useEditor();

  // Initialize physics systems
  useEffect(() => {
    pidControllerRef.current = new PIDController(pidParams);
    dronePhysicsRef.current = new DronePhysics();
  }, []);

  // Update PID parameters when they change
  useEffect(() => {
    if (pidControllerRef.current) {
      pidControllerRef.current.updateParams(pidParams);
    }
  }, [pidParams]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [event.code]: true }));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [event.code]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    if (!isRunning || !pidControllerRef.current || !dronePhysicsRef.current) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const deltaTime = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    if (deltaTime > 0.1) { // Skip large time jumps
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    // Map keyboard inputs to control setpoints
    const setpoints = {
      pitch: keys.KeyW ? -0.3 : keys.KeyS ? 0.3 : 0,
      roll: keys.KeyA ? -0.3 : keys.KeyD ? 0.3 : 0,
      yaw: keys.ArrowLeft ? -1 : keys.ArrowRight ? 1 : 0,
      throttle: keys.ArrowUp ? 1 : keys.ArrowDown ? -0.5 : 0
    };

    // Calculate PID outputs
    const pidOutputs = pidControllerRef.current.update(
      { 
        pitch: rotation.x, 
        roll: rotation.z, 
        yaw: rotation.y, 
        altitude: position.y 
      },
      setpoints,
      deltaTime
    );

    // Get wind forces at current drone position
    const windAtPosition = getWindAtPosition(
      { x: position.x, y: position.y, z: position.z },
      timestamp / 1000
    );
    const wind = new THREE.Vector3(windAtPosition.x, windAtPosition.y, windAtPosition.z);

    // Update physics
    const newState = dronePhysicsRef.current.update(
      { position, rotation, velocity, angularVelocity },
      pidOutputs,
      wind,
      deltaTime
    );

    // Update drone state
    updateDrone(newState);

    // Update telemetry
    setTelemetry({
      altitude: newState.position.y,
      speed: newState.velocity.length(),
      pitch: newState.rotation.x * (180 / Math.PI),
      roll: newState.rotation.z * (180 / Math.PI),
      yaw: newState.rotation.y * (180 / Math.PI),
      throttle: setpoints.throttle
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [isRunning, keys, position, rotation, velocity, angularVelocity, updateDrone, setTelemetry, getWindAtPosition]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  const handleStart = () => {
    setIsRunning(true);
    lastTimeRef.current = performance.now();
  };

  const handlePause = () => setIsRunning(false);
  
  const handleReset = () => {
    setIsRunning(false);
    reset();
    if (pidControllerRef.current) {
      pidControllerRef.current.reset();
    }
    setKeys({});
  };

  const handleCodeCompile = () => {
    setIsCompiling(true);
    setError('');
    
    setTimeout(() => {
      const result = compileCode(code, telemetry);
      if (result.success && result.pidParams) {
        updatePIDParams(result.pidParams);
        setError('');
      } else {
        setError(result.error || 'Compilation failed');
      }
      setIsCompiling(false);
    }, 1000);
  };

  const addDefaultWindSource = () => {
    addWindSource({
      name: 'Test Wind',
      force: 5,
      direction: Math.PI / 4,
      type: 'constant',
      variableParams: { frequency: 0.5, amplitude: 2 },
      enabled: true,
      position: { x: 0, y: 10, z: 0 },
      radius: 20
    });
  };

  return (
    <div className="relative w-full h-full">
      {/* 3D Visualization Area */}
      <div className="relative w-full h-96 bg-gradient-to-b from-sky-200 to-green-200 border-4 border-black overflow-hidden">
        {/* Environment */}
        <div className="absolute inset-0">
          {/* Ground Grid */}
          <div className="absolute bottom-0 w-full h-32 bg-green-300 opacity-50">
            <div className="grid grid-cols-20 grid-rows-8 h-full">
              {Array.from({ length: 160 }).map((_, i) => (
                <div key={i} className="border border-green-600 opacity-30"></div>
              ))}
            </div>
          </div>
          
          {/* Obstacles */}
          {obstacles.map((obstacle) => (
            <div
              key={obstacle.id}
              className="absolute bg-gray-600 border-2 border-black"
              style={{
                left: `${50 + obstacle.position.x * 2}%`,
                bottom: `${10 + obstacle.position.z * 2}%`,
                width: `${obstacle.size.x * 4}px`,
                height: `${obstacle.size.y * 4}px`,
                backgroundColor: obstacle.color
              }}
            />
          ))}
          
          {/* Wind Visualization */}
          {showWind && windSources.map((source) => (
            <div
              key={source.id}
              className="absolute"
              style={{
                left: `${50 + source.position.x * 2}%`,
                top: `${50 - source.position.y * 2}%`,
              }}
            >
              <motion.div
                className="w-8 h-8 border-2 border-blue-500 rounded-full bg-blue-200 opacity-70"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="absolute top-8 left-0 text-xs text-blue-600 font-bold">
                Wind {source.force.toFixed(1)}
              </div>
            </div>
          ))}
        </div>

        {/* Drone */}
        <motion.div
          className="absolute w-8 h-8 bg-orange-500 border-4 border-black transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${50 + position.x * 2}%`,
            top: `${50 - position.y * 2}%`,
            transform: `translate(-50%, -50%) rotate(${rotation.y * (180 / Math.PI)}deg)`
          }}
          animate={isRunning ? {
            scale: [1, 1.1, 1],
            rotate: rotation.y * (180 / Math.PI)
          } : {}}
          transition={isRunning ? { 
            scale: { duration: 0.5, repeat: Infinity },
            rotate: { duration: 0.1 }
          } : {}}
        >
          {/* Rotor blur effect when running */}
          {isRunning && (
            <motion.div
              className="absolute inset-0 border-2 border-orange-300 rounded-full opacity-50"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
            />
          )}
        </motion.div>

        {/* HUD Overlay */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-80 text-white p-4 rounded border-2 border-orange-500">
          <div className="text-xs font-mono space-y-1">
            <div>ALT: {telemetry.altitude.toFixed(1)}m</div>
            <div>SPD: {telemetry.speed.toFixed(1)}m/s</div>
            <div>YAW: {telemetry.yaw.toFixed(1)}°</div>
            <div>THR: {(telemetry.throttle * 100).toFixed(0)}%</div>
          </div>
        </div>

        {/* Active Controls Indicator */}
        {Object.values(keys).some(Boolean) && (
          <div className="absolute top-4 right-4 bg-orange-500 text-black p-2 rounded border-2 border-black">
            <div className="text-xs font-bold">
              {keys.KeyW && '↑'} {keys.KeyS && '↓'} {keys.KeyA && '←'} {keys.KeyD && '→'}
              {keys.ArrowUp && '▲'} {keys.ArrowDown && '▼'} {keys.ArrowLeft && '◄'} {keys.ArrowRight && '►'}
            </div>
          </div>
        )}
      </div>

      {/* Control Panel */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flight Controls */}
        <div className="bg-white border-4 border-black p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Cpu className="mr-2" size={20} />
            Flight Controls
          </h3>
          
          <div className="space-y-4">
            <div className="flex space-x-2">
              <button
                onClick={handleStart}
                disabled={isRunning}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-4 py-2 border-2 border-black font-bold transition-colors"
              >
                <Play size={16} className="inline mr-1" />
                START
              </button>
              
              <button
                onClick={handlePause}
                disabled={!isRunning}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white px-4 py-2 border-2 border-black font-bold transition-colors"
              >
                <Pause size={16} className="inline mr-1" />
                PAUSE
              </button>
              
              <button
                onClick={handleReset}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 border-2 border-black font-bold transition-colors"
              >
                <RotateCcw size={16} className="inline mr-1" />
                RESET
              </button>
            </div>

            <div className="bg-gray-100 p-4 border-2 border-black">
              <h4 className="font-bold mb-2">Control Scheme:</h4>
              <div className="text-sm space-y-1">
                <div><strong>W/S:</strong> Pitch Forward/Backward</div>
                <div><strong>A/D:</strong> Roll Left/Right</div>
                <div><strong>←/→:</strong> Yaw Left/Right</div>
                <div><strong>↑/↓:</strong> Throttle Up/Down</div>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry */}
        <div className="bg-white border-4 border-black p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Wifi className="mr-2" size={20} />
            Live Telemetry
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Altitude:</span>
              <span className="font-mono bg-gray-100 px-2 py-1 border border-black">
                {telemetry.altitude.toFixed(2)}m
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Speed:</span>
              <span className="font-mono bg-gray-100 px-2 py-1 border border-black">
                {telemetry.speed.toFixed(2)}m/s
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Pitch:</span>
              <span className="font-mono bg-gray-100 px-2 py-1 border border-black">
                {telemetry.pitch.toFixed(1)}°
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Roll:</span>
              <span className="font-mono bg-gray-100 px-2 py-1 border border-black">
                {telemetry.roll.toFixed(1)}°
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Yaw:</span>
              <span className="font-mono bg-gray-100 px-2 py-1 border border-black">
                {telemetry.yaw.toFixed(1)}°
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Throttle:</span>
              <span className="font-mono bg-gray-100 px-2 py-1 border border-black">
                {(telemetry.throttle * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Environment Controls */}
        <div className="bg-white border-4 border-black p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Settings className="mr-2" size={20} />
            Environment
          </h3>
          
          <div className="space-y-4">
            <button
              onClick={() => setShowWind(!showWind)}
              className={`w-full ${showWind ? 'bg-blue-500' : 'bg-gray-500'} hover:opacity-80 text-white px-4 py-2 border-2 border-black font-bold transition-colors`}
            >
              <Wind size={16} className="inline mr-1" />
              {showWind ? 'HIDE WIND' : 'SHOW WIND'}
            </button>
            
            {showWind && (
              <div className="space-y-2">
                <button
                  onClick={addDefaultWindSource}
                  className="w-full bg-blue-300 hover:bg-blue-400 text-black px-4 py-2 border-2 border-black font-bold transition-colors"
                >
                  Add Wind Source
                </button>
                
                <div className="text-sm">
                  <div>Wind Sources: {windSources.length}</div>
                  {windSources.map((source) => (
                    <div key={source.id} className="flex justify-between items-center bg-gray-100 p-2 border border-black mt-1">
                      <span>{source.name}</span>
                      <button
                        onClick={() => removeWindSource(source.id)}
                        className="bg-red-500 text-white px-2 py-1 border border-black text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Code Editor Panel */}
      {showCode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-white border-4 border-black p-6"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Code className="mr-2" size={20} />
            PID Controller Programming
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 p-4 border-2 border-black font-mono text-sm resize-none"
                placeholder="# Write your PID controller code here
# Example:
pitch_kp = 1.0
pitch_ki = 0.1
pitch_kd = 0.05

roll_kp = 1.0
roll_ki = 0.1
roll_kd = 0.05

yaw_kp = 2.0
yaw_ki = 0.0
yaw_kd = 0.1

altitude_kp = 5.0
altitude_ki = 1.0
altitude_kd = 1.0"
              />
              
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={handleCodeCompile}
                  disabled={isCompiling}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white px-4 py-2 border-2 border-black font-bold transition-colors"
                >
                  {isCompiling ? 'COMPILING...' : 'COMPILE & UPLOAD'}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 bg-red-100 border-2 border-red-500 p-3 text-red-700">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Current PID Parameters:</h4>
              <div className="bg-gray-100 p-4 border-2 border-black font-mono text-sm space-y-2">
                <div><strong>Pitch:</strong> P={pidParams.pitch.kp} I={pidParams.pitch.ki} D={pidParams.pitch.kd}</div>
                <div><strong>Roll:</strong> P={pidParams.roll.kp} I={pidParams.roll.ki} D={pidParams.roll.kd}</div>
                <div><strong>Yaw:</strong> P={pidParams.yaw.kp} I={pidParams.yaw.ki} D={pidParams.yaw.kd}</div>
                <div><strong>Alt:</strong> P={pidParams.altitude.kp} I={pidParams.altitude.ki} D={pidParams.altitude.kd}</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Toggle Code Editor */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowCode(!showCode)}
          className="bg-black text-white px-6 py-2 border-2 border-black hover:bg-gray-800 transition-colors font-bold"
        >
          <Code size={16} className="inline mr-1" />
          {showCode ? 'HIDE CODE EDITOR' : 'SHOW CODE EDITOR'}
        </button>
      </div>
    </div>
  );
};

export default AdvancedDroneSimulation;