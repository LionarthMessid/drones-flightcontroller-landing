
import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings, Zap, Wifi, Cpu, Code, Wind, Eye } from 'lucide-react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { KeyboardControls, useKeyboardControls, OrbitControls, Text, Box, Plane, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { useDrone } from '../lib/useDrone';
import { useWind } from '../lib/useWind';
import { useEnvironment } from '../lib/useEnvironment';
import { useEditor } from '../lib/useEditor';
import { compileCode } from '../lib/codeCompiler';
import { PIDController } from '../lib/pidController';
import { DronePhysics } from '../lib/dronePhysics';

// Control mappings for drone movement
enum Controls {
  forward = 'forward',      // W - Pitch forward
  backward = 'backward',    // S - Pitch backward
  left = 'left',           // A - Roll left
  right = 'right',         // D - Roll right
  yawLeft = 'yawLeft',     // Left Arrow - Yaw left
  yawRight = 'yawRight',   // Right Arrow - Yaw right
  throttleUp = 'throttleUp', // Up Arrow - Throttle up
  throttleDown = 'throttleDown', // Down Arrow - Throttle down
}

const keyMap = [
  { name: Controls.forward, keys: ['KeyW'] },
  { name: Controls.backward, keys: ['KeyS'] },
  { name: Controls.left, keys: ['KeyA'] },
  { name: Controls.right, keys: ['KeyD'] },
  { name: Controls.yawLeft, keys: ['ArrowLeft'] },
  { name: Controls.yawRight, keys: ['ArrowRight'] },
  { name: Controls.throttleUp, keys: ['ArrowUp'] },
  { name: Controls.throttleDown, keys: ['ArrowDown'] },
];

// 3D Drone Model Component
const DroneModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const rotorRefs = useRef<THREE.Mesh[]>([]);
  const { position, rotation, telemetry } = useDrone();

  // Animate rotors based on throttle
  useFrame((state, delta) => {
    if (rotorRefs.current) {
      const rotorSpeed = (telemetry.throttle + 0.5) * 50;
      rotorRefs.current.forEach((rotor, index) => {
        if (rotor) {
          const direction = index % 2 === 0 ? 1 : -1;
          rotor.rotation.y += direction * rotorSpeed * delta;
        }
      });
    }
  });

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.copy(position);
      groupRef.current.rotation.setFromVector3(rotation);
    }
  }, [position, rotation]);

  return (
    <group ref={groupRef}>
      {/* Main Body */}
      <Box args={[2, 0.3, 2]} position={[0, 0, 0]} castShadow receiveShadow>
        <meshPhongMaterial color="#FF7120" />
      </Box>

      {/* Center Hub */}
      <Cylinder args={[0.3, 0.3, 0.2, 8]} position={[0, 0.2, 0]} castShadow>
        <meshPhongMaterial color="#444444" />
      </Cylinder>

      {/* Arms */}
      {[
        { pos: [0.8, 0, 0], rot: [0, 0, 0] },
        { pos: [-0.8, 0, 0], rot: [0, 0, 0] },
        { pos: [0, 0, 0.8], rot: [0, Math.PI / 2, 0] },
        { pos: [0, 0, -0.8], rot: [0, Math.PI / 2, 0] }
      ].map((arm, index) => (
        <Box
          key={index}
          args={[0.8, 0.1, 0.1]}
          position={arm.pos}
          rotation={arm.rot}
          castShadow
        >
          <meshPhongMaterial color="#333333" />
        </Box>
      ))}

      {/* Rotors */}
      {[
        [1.2, 0.3, 0],
        [-1.2, 0.3, 0],
        [0, 0.3, 1.2],
        [0, 0.3, -1.2]
      ].map((pos, index) => (
        <group key={index} position={pos}>
          <Cylinder
            ref={(ref) => {
              if (ref) rotorRefs.current[index] = ref;
            }}
            args={[0.6, 0.6, 0.02, 8]}
            castShadow
          >
            <meshPhongMaterial color="#666666" transparent opacity={0.3} />
          </Cylinder>
        </group>
      ))}
    </group>
  );
};

// 3D Environment Component
const Environment3D = () => {
  const { obstacles } = useEnvironment();
  const { windSources } = useWind();

  return (
    <group>
      {/* Ground */}
      <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <meshPhongMaterial color="#4ade80" />
      </Plane>

      {/* Grid */}
      <gridHelper args={[100, 50, '#22c55e', '#16a34a']} />

      {/* Landing Pad */}
      <Cylinder args={[3, 3, 0.1, 16]} position={[0, 0.05, 0]} receiveShadow>
        <meshPhongMaterial color="#f59e0b" />
      </Cylinder>

      {/* Landing Pad Markings */}
      <Text
        position={[0, 0.11, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={1}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        H
      </Text>

      {/* Obstacles */}
      {obstacles.map((obstacle) => (
        <Box
          key={obstacle.id}
          args={[obstacle.size.x, obstacle.size.y, obstacle.size.z]}
          position={[obstacle.position.x, obstacle.position.y + obstacle.size.y / 2, obstacle.position.z]}
          castShadow
          receiveShadow
        >
          <meshPhongMaterial color={obstacle.color} />
        </Box>
      ))}

      {/* Wind Sources Visualization */}
      {windSources.map((source) => (
        <group key={source.id} position={[source.position.x, source.position.y, source.position.z]}>
          <Cylinder args={[source.radius, source.radius, 0.5, 16]} position={[0, 0.25, 0]}>
            <meshPhongMaterial color="#3b82f6" transparent opacity={0.2} />
          </Cylinder>
          <Text
            position={[0, source.radius + 1, 0]}
            fontSize={0.5}
            color="#3b82f6"
            anchorX="center"
            anchorY="middle"
          >
            {source.name}
          </Text>
        </group>
      ))}
    </group>
  );
};

// 3D Scene Component
const Scene3D = () => {
  const [, getControls] = useKeyboardControls<Controls>();
  const { camera } = useThree();
  
  const pidController = useRef<PIDController | null>(null);
  const dronePhysics = useRef<DronePhysics | null>(null);
  
  const { 
    position, 
    rotation, 
    velocity, 
    angularVelocity,
    pidParams,
    updateDrone,
    setTelemetry
  } = useDrone();
  
  const { getWindAtPosition } = useWind();

  // Initialize physics systems
  useEffect(() => {
    pidController.current = new PIDController(pidParams);
    dronePhysics.current = new DronePhysics();
  }, []);

  // Update PID parameters when they change
  useEffect(() => {
    if (pidController.current) {
      pidController.current.updateParams(pidParams);
    }
  }, [pidParams]);

  // Animation loop
  useFrame((state, delta) => {
    if (!pidController.current || !dronePhysics.current) return;

    // Get control inputs
    const controls = getControls();
    
    // Map controls to setpoints
    const setpoints = {
      pitch: controls.forward ? -0.3 : controls.backward ? 0.3 : 0,
      roll: controls.left ? -0.3 : controls.right ? 0.3 : 0,
      yaw: controls.yawLeft ? -1 : controls.yawRight ? 1 : 0,
      throttle: controls.throttleUp ? 1 : controls.throttleDown ? -0.5 : 0
    };

    // Calculate PID outputs
    const pidOutputs = pidController.current.update(
      { 
        pitch: rotation.x, 
        roll: rotation.z, 
        yaw: rotation.y, 
        altitude: position.y 
      },
      setpoints,
      delta
    );

    // Get wind forces
    const windAtPosition = getWindAtPosition(
      { x: position.x, y: position.y, z: position.z },
      state.clock.elapsedTime
    );
    const wind = new THREE.Vector3(windAtPosition.x, windAtPosition.y, windAtPosition.z);

    // Update physics
    const newState = dronePhysics.current.update(
      { position, rotation, velocity, angularVelocity },
      pidOutputs,
      wind,
      delta
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
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Camera Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        target={[position.x, position.y, position.z]}
      />
      
      {/* Scene Objects */}
      <Environment3D />
      <DroneModel />
    </>
  );
};

// HUD Component
const HUD = () => {
  const { telemetry } = useDrone();
  const [, getControls] = useKeyboardControls<Controls>();
  const controls = getControls();

  return (
    <div className="absolute top-4 left-4 z-10 pointer-events-none">
      {/* Telemetry Display */}
      <div className="bg-black bg-opacity-80 text-white p-4 rounded border-2 border-orange-500 mb-4">
        <div className="text-xs font-mono space-y-1">
          <div>ALT: {telemetry.altitude.toFixed(1)}m</div>
          <div>SPD: {telemetry.speed.toFixed(1)}m/s</div>
          <div>PITCH: {telemetry.pitch.toFixed(1)}°</div>
          <div>ROLL: {telemetry.roll.toFixed(1)}°</div>
          <div>YAW: {telemetry.yaw.toFixed(1)}°</div>
          <div>THR: {(telemetry.throttle * 100).toFixed(0)}%</div>
        </div>
      </div>

      {/* Active Controls Indicator */}
      {Object.values(controls).some(Boolean) && (
        <div className="bg-orange-500 text-black p-2 rounded border-2 border-black">
          <div className="text-xs font-bold">
            {controls.forward && '↑'} {controls.backward && '↓'} {controls.left && '←'} {controls.right && '→'}
            {controls.throttleUp && '▲'} {controls.throttleDown && '▼'} {controls.yawLeft && '◄'} {controls.yawRight && '►'}
          </div>
        </div>
      )}
    </div>
  );
};

const AdvancedDroneSimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [showWind, setShowWind] = useState(false);
  
  const { 
    pidParams,
    telemetry,
    updatePIDParams,
    reset
  } = useDrone();

  const { getWindAtPosition, windSources, addWindSource, removeWindSource } = useWind();
  const { obstacles } = useEnvironment();
  const { code, setCode, error, setError, isCompiling, setIsCompiling } = useEditor();

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);
  
  const handleReset = () => {
    setIsRunning(false);
    reset();
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
      {/* 3D Canvas */}
      <div className="relative w-full h-96 bg-black border-4 border-black overflow-hidden">
        <KeyboardControls map={keyMap}>
          <Canvas
            camera={{
              position: [0, 15, 25],
              fov: 60,
              near: 0.1,
              far: 1000
            }}
            shadows
            style={{ width: '100%', height: '100%' }}
          >
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </Canvas>
          
          {/* HUD Overlay */}
          <HUD />
        </KeyboardControls>

        {/* Instructions */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded border-2 border-orange-500">
          <div className="text-xs font-mono space-y-1">
            <div className="font-bold mb-2">CONTROLS:</div>
            <div>W/S: Pitch</div>
            <div>A/D: Roll</div>
            <div>←/→: Yaw</div>
            <div>↑/↓: Throttle</div>
            <div className="mt-2">Mouse: Camera</div>
          </div>
        </div>
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
              <h4 className="font-bold mb-2">3D Flight Simulator:</h4>
              <div className="text-sm space-y-1">
                <div><strong>WASD:</strong> Pitch/Roll Control</div>
                <div><strong>Arrow Keys:</strong> Yaw/Throttle</div>
                <div><strong>Mouse:</strong> Camera Controls</div>
                <div><strong>Scroll:</strong> Zoom In/Out</div>
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
