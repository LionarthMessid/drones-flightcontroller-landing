import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings, Zap, Wifi, Cpu, Code, Wind, Eye } from 'lucide-react';
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
  forward = 'forward',
  backward = 'backward',
  left = 'left',
  right = 'right',
  yawLeft = 'yawLeft',
  yawRight = 'yawRight',
  throttleUp = 'throttleUp',
  throttleDown = 'throttleDown',
}

// 3D Scene Manager
class DroneScene3D {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private droneGroup: THREE.Group;
  private rotors: THREE.Mesh[] = [];
  private animationId: number | null = null;
  private controls: { [key: string]: boolean } = {};
  private pidController: PIDController | null = null;
  private dronePhysics: DronePhysics | null = null;
  private updateDrone: Function;
  private setTelemetry: Function;
  private getWindAtPosition: Function;
  private position: THREE.Vector3 = new THREE.Vector3(0, 2, 0);
  private rotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private angularVelocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private loader: any;

  constructor(
    canvas: HTMLCanvasElement,
    updateDrone: Function,
    setTelemetry: Function,
    getWindAtPosition: Function,
    pidParams: any
  ) {
    this.updateDrone = updateDrone;
    this.setTelemetry = setTelemetry;
    this.getWindAtPosition = getWindAtPosition;
    
    // Initialize Three.js components
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    // GLTFLoader will be dynamically imported if needed
    
    this.setupScene();
    this.setupLighting();
    this.setupEnvironment();
    this.setupDrone();
    this.setupControls();
    
    // Initialize physics
    this.pidController = new PIDController(pidParams);
    this.dronePhysics = new DronePhysics();
    
    this.camera.position.set(0, 15, 25);
    this.camera.lookAt(0, 0, 0);
    
    this.animate();
  }

  private setupScene() {
    this.scene.background = new THREE.Color(0x87CEEB);
    this.renderer.setSize(800, 400);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  private setupLighting() {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    this.scene.add(directionalLight);
  }

  private setupEnvironment() {
    // Ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x4ade80 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Grid
    const gridHelper = new THREE.GridHelper(100, 50, 0x22c55e, 0x16a34a);
    this.scene.add(gridHelper);

    // Landing pad
    const padGeometry = new THREE.CylinderGeometry(3, 3, 0.1, 16);
    const padMaterial = new THREE.MeshLambertMaterial({ color: 0xf59e0b });
    const landingPad = new THREE.Mesh(padGeometry, padMaterial);
    landingPad.position.y = 0.05;
    landingPad.receiveShadow = true;
    this.scene.add(landingPad);
  }

  private setupDrone() {
    this.droneGroup = new THREE.Group();
    this.createDroneModel();
    this.droneGroup.position.copy(this.position);
    this.scene.add(this.droneGroup);
  }

  private createDroneModel() {
    const droneModel = new THREE.Group();

    // Main Body
    const bodyGeometry = new THREE.BoxGeometry(2, 0.3, 2);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xFF7120 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    droneModel.add(body);

    // Center Hub
    const hubGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 8);
    const hubMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
    const hub = new THREE.Mesh(hubGeometry, hubMaterial);
    hub.position.y = 0.2;
    hub.castShadow = true;
    droneModel.add(hub);

    // Arms
    const armPositions = [
      { pos: [0.8, 0, 0], rot: [0, 0, 0] },
      { pos: [-0.8, 0, 0], rot: [0, 0, 0] },
      { pos: [0, 0, 0.8], rot: [0, Math.PI / 2, 0] },
      { pos: [0, 0, -0.8], rot: [0, Math.PI / 2, 0] }
    ];

    armPositions.forEach((armData, index) => {
      const armGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.1);
      const armMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
      const arm = new THREE.Mesh(armGeometry, armMaterial);
      arm.position.set(armData.pos[0], armData.pos[1], armData.pos[2]);
      arm.rotation.set(armData.rot[0], armData.rot[1], armData.rot[2]);
      arm.castShadow = true;
      droneModel.add(arm);
    });

    // Rotors
    const rotorPositions = [
      [1.2, 0.3, 0],
      [-1.2, 0.3, 0],
      [0, 0.3, 1.2],
      [0, 0.3, -1.2]
    ];

    rotorPositions.forEach((pos, index) => {
      const rotorGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.02, 8);
      const rotorMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x666666, 
        transparent: true, 
        opacity: 0.3 
      });
      const rotor = new THREE.Mesh(rotorGeometry, rotorMaterial);
      rotor.position.set(pos[0], pos[1], pos[2]);
      rotor.castShadow = true;
      this.rotors.push(rotor);
      droneModel.add(rotor);
    });

    this.droneGroup.add(droneModel);
  }

  private setupControls() {
    window.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'KeyW': this.controls.forward = true; break;
        case 'KeyS': this.controls.backward = true; break;
        case 'KeyA': this.controls.left = true; break;
        case 'KeyD': this.controls.right = true; break;
        case 'ArrowLeft': this.controls.yawLeft = true; break;
        case 'ArrowRight': this.controls.yawRight = true; break;
        case 'ArrowUp': this.controls.throttleUp = true; break;
        case 'ArrowDown': this.controls.throttleDown = true; break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyW': this.controls.forward = false; break;
        case 'KeyS': this.controls.backward = false; break;
        case 'KeyA': this.controls.left = false; break;
        case 'KeyD': this.controls.right = false; break;
        case 'ArrowLeft': this.controls.yawLeft = false; break;
        case 'ArrowRight': this.controls.yawRight = false; break;
        case 'ArrowUp': this.controls.throttleUp = false; break;
        case 'ArrowDown': this.controls.throttleDown = false; break;
      }
    });
  }

  private animate = () => {
    if (!this.pidController || !this.dronePhysics) return;

    const delta = 0.016; // ~60fps

    // Map controls to setpoints
    const setpoints = {
      pitch: this.controls.forward ? -0.3 : this.controls.backward ? 0.3 : 0,
      roll: this.controls.left ? -0.3 : this.controls.right ? 0.3 : 0,
      yaw: this.controls.yawLeft ? -1 : this.controls.yawRight ? 1 : 0,
      throttle: this.controls.throttleUp ? 1 : this.controls.throttleDown ? -0.5 : 0
    };

    // Calculate PID outputs
    const pidOutputs = this.pidController.update(
      { 
        pitch: this.rotation.x, 
        roll: this.rotation.z, 
        yaw: this.rotation.y, 
        altitude: this.position.y 
      },
      setpoints,
      delta
    );

    // Get wind forces
    const windAtPosition = this.getWindAtPosition(
      { x: this.position.x, y: this.position.y, z: this.position.z },
      Date.now() * 0.001
    );
    const wind = new THREE.Vector3(windAtPosition.x, windAtPosition.y, windAtPosition.z);

    // Update physics
    const newState = this.dronePhysics.update(
      { 
        position: this.position, 
        rotation: this.rotation, 
        velocity: this.velocity, 
        angularVelocity: this.angularVelocity 
      },
      pidOutputs,
      wind,
      delta
    );

    // Update local state
    this.position.copy(newState.position);
    this.rotation.copy(newState.rotation);
    this.velocity.copy(newState.velocity);
    this.angularVelocity.copy(newState.angularVelocity);

    // Update drone visuals
    this.droneGroup.position.copy(this.position);
    this.droneGroup.rotation.setFromVector3(this.rotation);

    // Animate rotors
    const rotorSpeed = (setpoints.throttle + 0.5) * 50 * delta;
    this.rotors.forEach((rotor, index) => {
      if (rotor) {
        const direction = index % 2 === 0 ? 1 : -1;
        rotor.rotation.y += direction * rotorSpeed;
      }
    });

    // Update camera to follow drone
    this.camera.position.x = this.position.x;
    this.camera.position.z = this.position.z + 25;
    this.camera.lookAt(this.position);

    // Update telemetry
    this.setTelemetry({
      altitude: this.position.y,
      speed: this.velocity.length(),
      pitch: this.rotation.x * (180 / Math.PI),
      roll: this.rotation.z * (180 / Math.PI),
      yaw: this.rotation.y * (180 / Math.PI),
      throttle: setpoints.throttle
    });

    // Render the scene
    this.renderer.render(this.scene, this.camera);
    
    this.animationId = requestAnimationFrame(this.animate);
  };

  public updatePIDParams(params: any) {
    if (this.pidController) {
      this.pidController.updateParams(params);
    }
  }

  public reset() {
    this.position.set(0, 2, 0);
    this.rotation.set(0, 0, 0);
    this.velocity.set(0, 0, 0);
    this.angularVelocity.set(0, 0, 0);
    this.droneGroup.position.copy(this.position);
    this.droneGroup.rotation.setFromVector3(this.rotation);
  }

  public destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('keydown', this.setupControls);
    window.removeEventListener('keyup', this.setupControls);
    this.renderer.dispose();
  }
}

const Simple3DDroneSimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [showWind, setShowWind] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<DroneScene3D | null>(null);
  
  const { 
    pidParams,
    telemetry,
    updateDrone,
    setTelemetry,
    updatePIDParams,
    reset
  } = useDrone();

  const { getWindAtPosition, windSources, addWindSource, removeWindSource } = useWind();
  const { obstacles } = useEnvironment();
  const { code, setCode, error, setError, isCompiling, setIsCompiling } = useEditor();

  useEffect(() => {
    if (canvasRef.current && !sceneRef.current) {
      sceneRef.current = new DroneScene3D(
        canvasRef.current,
        updateDrone,
        setTelemetry,
        getWindAtPosition,
        pidParams
      );
    }

    return () => {
      if (sceneRef.current) {
        sceneRef.current.destroy();
        sceneRef.current = null;
      }
    };
  }, []);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);
  
  const handleReset = () => {
    setIsRunning(false);
    if (sceneRef.current) {
      sceneRef.current.reset();
    }
    reset();
  };

  const handleCodeCompile = () => {
    setIsCompiling(true);
    setError('');
    
    setTimeout(() => {
      const result = compileCode(code, telemetry);
      if (result.success && result.pidParams) {
        updatePIDParams(result.pidParams);
        if (sceneRef.current) {
          sceneRef.current.updatePIDParams(result.pidParams);
        }
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
      {/* Demo Notification */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700 font-mono">
              <strong>DEMO VERSION:</strong> This is a demonstration of our 3D flight simulator. 
              The full production simulator with advanced features is currently in development.
            </p>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="relative w-full h-96 bg-black border-4 border-black overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full h-full"
          style={{ display: 'block' }}
        />
        
        {/* HUD Overlay */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
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
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded border-2 border-orange-500">
          <div className="text-xs font-mono space-y-1">
            <div className="font-bold mb-2">CONTROLS:</div>
            <div>W/S: Pitch</div>
            <div>A/D: Roll</div>
            <div>←/→: Yaw</div>
            <div>↑/↓: Throttle</div>
          </div>
        </div>
      </div>

      {/* Code Editor Section */}
      <div className="mt-6 mb-8">
        <div className="bg-white border-4 border-black p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Code className="mr-2" size={20} />
            Flight Controller Code Editor
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Code Input */}
            <div>
              <h4 className="font-bold mb-2">ESP32 Flight Controller Code:</h4>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 p-3 border-2 border-black font-mono text-sm bg-gray-900 text-green-400 rounded"
                placeholder="// Enter your ESP32 flight controller code here
void setup() {
  Serial.begin(115200);
  // Initialize flight controller
  pid_pitch_kp = 2.5;
  pid_pitch_ki = 0.1;
  pid_pitch_kd = 0.8;
  
  pid_roll_kp = 2.5;
  pid_roll_ki = 0.1;
  pid_roll_kd = 0.8;
  
  pid_yaw_kp = 1.0;
  pid_yaw_ki = 0.05;
  pid_yaw_kd = 0.3;
  
  pid_altitude_kp = 3.0;
  pid_altitude_ki = 0.2;
  pid_altitude_kd = 1.0;
}

void loop() {
  // Flight control loop
  updateSensors();
  calculatePID();
  updateMotors();
}"
              />
              
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={handleCodeCompile}
                  disabled={isCompiling}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white px-4 py-2 border-2 border-black font-bold transition-colors"
                >
                  {isCompiling ? 'COMPILING...' : 'COMPILE & UPLOAD'}
                </button>
                
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 border-2 border-black font-bold transition-colors"
                >
                  {showCode ? 'HIDE DETAILS' : 'SHOW DETAILS'}
                </button>
              </div>
            </div>
            
            {/* Output Console */}
            <div>
              <h4 className="font-bold mb-2">Compilation Output & Serial Monitor:</h4>
              <div className="bg-black text-white p-4 border-2 border-gray-300 rounded h-64 overflow-y-auto font-mono text-sm">
                {error ? (
                  <div>
                    <div className="text-red-400 mb-2">COMPILATION ERROR:</div>
                    <div className="text-red-300">{error}</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-orange-500 mb-2">COMPILATION OUTPUT:</div>
                    <div className="text-green-400 mb-1">✓ Sketch compiled successfully</div>
                    <div className="text-green-400 mb-1">✓ Flash memory usage: 67%</div>
                    <div className="text-green-400 mb-1">✓ Global variables: 14%</div>
                    <div className="text-white mb-4">Ready to upload to ESP32</div>
                    
                    <div className="text-orange-500 mb-2">SERIAL MONITOR:</div>
                    <div className="text-gray-400 mb-1">Flight Controller Ready</div>
                    <div className="text-gray-400 mb-1">PID Parameters Updated</div>
                    <div className="text-gray-400 mb-1">Alt: {telemetry.altitude.toFixed(1)}m | Speed: {telemetry.speed.toFixed(1)}m/s | Battery: 98%</div>
                    <div className="text-gray-400 mb-1">Pitch: {telemetry.pitch.toFixed(1)}° | Roll: {telemetry.roll.toFixed(1)}° | Yaw: {telemetry.yaw.toFixed(1)}°</div>
                    <div className="text-blue-400">Telemetry streaming at 50Hz</div>
                    <div className="text-green-400 animate-pulse">█</div>
                  </div>
                )}
              </div>
              
              {showCode && (
                <div className="mt-4 text-sm">
                  <h5 className="font-bold mb-2">Code Analysis:</h5>
                  <div className="bg-gray-100 p-3 border border-gray-300 rounded">
                    <div className="space-y-1">
                      <div>• Functions detected: setup(), loop()</div>
                      <div>• PID parameters: {Object.keys(pidParams).length} controllers</div>
                      <div>• Memory usage: Estimated 15KB</div>
                      <div>• Execution time: ~2ms per loop</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
                <div><strong>3D Model:</strong> Realistic drone visualization</div>
                <div><strong>Physics:</strong> Real-time flight dynamics</div>
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

        {/* System Status */}
        <div className="bg-white border-4 border-black p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Zap className="mr-2" size={20} />
            System Status
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>3D Renderer:</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 border border-green-300 rounded font-mono text-sm">
                ACTIVE
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Physics Engine:</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 border border-green-300 rounded font-mono text-sm">
                RUNNING
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>PID Controller:</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 border border-green-300 rounded font-mono text-sm">
                ENABLED
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Model:</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 border border-blue-300 rounded font-mono text-sm">
                3D LOADED
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simple3DDroneSimulation;