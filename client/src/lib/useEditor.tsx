
import { create } from "zustand";

interface EditorStore {
  code: string;
  setCode: (code: string) => void;
  error: string;
  setError: (error: string) => void;
  isCompiling: boolean;
  setIsCompiling: (isCompiling: boolean) => void;
}

export const useEditor = create<EditorStore>((set) => ({
  code: `# PID Controller Parameters
# Adjust these values to tune the drone's flight behavior

# Pitch Control (Forward/Backward)
pitch_kp = 1.0
pitch_ki = 0.1
pitch_kd = 0.05

# Roll Control (Left/Right)
roll_kp = 1.0
roll_ki = 0.1
roll_kd = 0.05

# Yaw Control (Rotation)
yaw_kp = 2.0
yaw_ki = 0.0
yaw_kd = 0.1

# Altitude Control (Up/Down)
altitude_kp = 5.0
altitude_ki = 1.0
altitude_kd = 1.0`,
  
  setCode: (code) => set({ code }),
  error: '',
  setError: (error) => set({ error }),
  isCompiling: false,
  setIsCompiling: (isCompiling) => set({ isCompiling })
}));
