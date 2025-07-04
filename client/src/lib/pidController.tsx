
export interface PIDParams {
  pitch: { kp: number; ki: number; kd: number };
  roll: { kp: number; ki: number; kd: number };
  yaw: { kp: number; ki: number; kd: number };
  altitude: { kp: number; ki: number; kd: number };
}

export class PIDController {
  private params: PIDParams;
  private integral: { pitch: number; roll: number; yaw: number; altitude: number } = {
    pitch: 0, roll: 0, yaw: 0, altitude: 0
  };
  private previousError: { pitch: number; roll: number; yaw: number; altitude: number } = {
    pitch: 0, roll: 0, yaw: 0, altitude: 0
  };

  constructor(params: PIDParams) {
    this.params = params;
  }

  updateParams(params: PIDParams) {
    this.params = params;
  }

  update(
    current: { pitch: number; roll: number; yaw: number; altitude: number },
    setpoints: { pitch: number; roll: number; yaw: number; throttle: number },
    deltaTime: number
  ) {
    const outputs = {
      pitch: 0,
      roll: 0,
      yaw: 0,
      throttle: 0
    };

    // Calculate errors
    const errors = {
      pitch: setpoints.pitch - current.pitch,
      roll: setpoints.roll - current.roll,
      yaw: setpoints.yaw - current.yaw,
      altitude: setpoints.throttle * 10 - current.altitude // Simple altitude control
    };

    // Calculate PID outputs for each axis
    for (const axis of ['pitch', 'roll', 'yaw', 'altitude'] as const) {
      const error = errors[axis];
      const params = this.params[axis];

      // Proportional term
      const proportional = params.kp * error;

      // Integral term
      this.integral[axis] += error * deltaTime;
      // Prevent integral windup
      this.integral[axis] = Math.max(-10, Math.min(10, this.integral[axis]));
      const integral = params.ki * this.integral[axis];

      // Derivative term
      const derivative = params.kd * (error - this.previousError[axis]) / deltaTime;
      this.previousError[axis] = error;

      // Combine terms
      const output = proportional + integral + derivative;

      if (axis === 'altitude') {
        outputs.throttle = Math.max(-1, Math.min(1, output));
      } else {
        outputs[axis] = Math.max(-1, Math.min(1, output));
      }
    }

    return outputs;
  }

  reset() {
    this.integral = { pitch: 0, roll: 0, yaw: 0, altitude: 0 };
    this.previousError = { pitch: 0, roll: 0, yaw: 0, altitude: 0 };
  }
}
