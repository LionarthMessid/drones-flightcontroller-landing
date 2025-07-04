
import * as THREE from 'three';
import { DroneState } from './useDrone';

export class DronePhysics {
  private mass = 1.5; // kg
  private gravity = -9.81; // m/s²
  private dragCoefficient = 0.1;
  private maxTiltAngle = Math.PI / 4; // 45 degrees max tilt

  update(
    state: DroneState,
    pidOutputs: { pitch: number; roll: number; yaw: number; throttle: number },
    wind: THREE.Vector3,
    deltaTime: number
  ): DroneState {
    const { position, rotation, velocity, angularVelocity } = state;
    
    // Create new vectors for the updated state
    const newPosition = position.clone();
    const newRotation = rotation.clone();
    const newVelocity = velocity.clone();
    const newAngularVelocity = angularVelocity.clone();

    // Apply angular acceleration from PID outputs
    const angularAcceleration = new THREE.Vector3(
      pidOutputs.pitch * 2, // Angular acceleration around X axis
      pidOutputs.yaw * 2,   // Angular acceleration around Y axis
      pidOutputs.roll * 2   // Angular acceleration around Z axis
    );

    // Update angular velocity with damping
    newAngularVelocity.add(angularAcceleration.clone().multiplyScalar(deltaTime));
    newAngularVelocity.multiplyScalar(0.98); // Angular damping

    // Update rotation
    newRotation.add(newAngularVelocity.clone().multiplyScalar(deltaTime));

    // Limit tilt angles
    newRotation.x = Math.max(-this.maxTiltAngle, Math.min(this.maxTiltAngle, newRotation.x));
    newRotation.z = Math.max(-this.maxTiltAngle, Math.min(this.maxTiltAngle, newRotation.z));

    // Calculate forces
    const forces = new THREE.Vector3();

    // Gravity
    forces.add(new THREE.Vector3(0, this.gravity * this.mass, 0));

    // Thrust (always upward in drone's local frame)
    const thrustMagnitude = (pidOutputs.throttle + 1) * 15; // Base thrust to counter gravity
    const thrustDirection = new THREE.Vector3(0, 1, 0);
    
    // Apply drone's rotation to thrust direction
    thrustDirection.applyEuler(new THREE.Euler(newRotation.x, newRotation.y, newRotation.z));
    forces.add(thrustDirection.multiplyScalar(thrustMagnitude));

    // Drag
    const dragForce = newVelocity.clone().multiplyScalar(-this.dragCoefficient * newVelocity.length());
    forces.add(dragForce);

    // Wind forces
    forces.add(wind.clone().multiplyScalar(0.5));

    // Apply forces to velocity
    const acceleration = forces.divideScalar(this.mass);
    newVelocity.add(acceleration.multiplyScalar(deltaTime));

    // Update position
    newPosition.add(newVelocity.clone().multiplyScalar(deltaTime));

    // Ground collision
    if (newPosition.y < 0.5) {
      newPosition.y = 0.5;
      newVelocity.y = Math.max(0, newVelocity.y); // Prevent sinking
    }

    // Boundary limits
    const boundary = 50;
    newPosition.x = Math.max(-boundary, Math.min(boundary, newPosition.x));
    newPosition.z = Math.max(-boundary, Math.min(boundary, newPosition.z));
    newPosition.y = Math.max(0.5, Math.min(boundary, newPosition.y));

    return {
      position: newPosition,
      rotation: newRotation,
      velocity: newVelocity,
      angularVelocity: newAngularVelocity
    };
  }
}
