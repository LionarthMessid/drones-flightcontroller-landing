
import { PIDParams } from './pidController';
import { DroneTelemetry } from './useDrone';

export const defaultPIDParams: PIDParams = {
  pitch: { kp: 1.0, ki: 0.1, kd: 0.05 },
  roll: { kp: 1.0, ki: 0.1, kd: 0.05 },
  yaw: { kp: 2.0, ki: 0.0, kd: 0.1 },
  altitude: { kp: 5.0, ki: 1.0, kd: 1.0 }
};

export interface CompileResult {
  success: boolean;
  pidParams?: PIDParams;
  error?: string;
}

export function compileCode(code: string, telemetry: DroneTelemetry): CompileResult {
  try {
    // Parse the code to extract PID parameters
    const lines = code.split('\n');
    const params: any = {};
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('#') || trimmed === '') continue;
      
      const match = trimmed.match(/^(\w+)\s*=\s*([\d.]+)$/);
      if (match) {
        const [, key, value] = match;
        params[key] = parseFloat(value);
      }
    }
    
    // Validate and construct PID parameters
    const pidParams: PIDParams = {
      pitch: {
        kp: params.pitch_kp ?? defaultPIDParams.pitch.kp,
        ki: params.pitch_ki ?? defaultPIDParams.pitch.ki,
        kd: params.pitch_kd ?? defaultPIDParams.pitch.kd
      },
      roll: {
        kp: params.roll_kp ?? defaultPIDParams.roll.kp,
        ki: params.roll_ki ?? defaultPIDParams.roll.ki,
        kd: params.roll_kd ?? defaultPIDParams.roll.kd
      },
      yaw: {
        kp: params.yaw_kp ?? defaultPIDParams.yaw.kp,
        ki: params.yaw_ki ?? defaultPIDParams.yaw.ki,
        kd: params.yaw_kd ?? defaultPIDParams.yaw.kd
      },
      altitude: {
        kp: params.altitude_kp ?? defaultPIDParams.altitude.kp,
        ki: params.altitude_ki ?? defaultPIDParams.altitude.ki,
        kd: params.altitude_kd ?? defaultPIDParams.altitude.kd
      }
    };
    
    // Validate parameter ranges
    for (const axis of ['pitch', 'roll', 'yaw', 'altitude'] as const) {
      const axisParams = pidParams[axis];
      if (axisParams.kp < 0 || axisParams.kp > 100) {
        return { success: false, error: `${axis} Kp must be between 0 and 100` };
      }
      if (axisParams.ki < 0 || axisParams.ki > 10) {
        return { success: false, error: `${axis} Ki must be between 0 and 10` };
      }
      if (axisParams.kd < 0 || axisParams.kd > 10) {
        return { success: false, error: `${axis} Kd must be between 0 and 10` };
      }
    }
    
    return { success: true, pidParams };
    
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown compilation error' 
    };
  }
}
