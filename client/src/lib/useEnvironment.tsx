
import { create } from "zustand";

export interface Obstacle {
  id: string;
  position: { x: number; y: number; z: number };
  size: { x: number; y: number; z: number };
  color: string;
  type: 'box' | 'cylinder' | 'sphere';
}

interface EnvironmentStore {
  obstacles: Obstacle[];
  addObstacle: (obstacle: Omit<Obstacle, 'id'>) => void;
  removeObstacle: (id: string) => void;
  updateObstacle: (id: string, updates: Partial<Obstacle>) => void;
}

export const useEnvironment = create<EnvironmentStore>((set, get) => ({
  obstacles: [
    {
      id: 'obstacle-1',
      position: { x: 10, y: 0, z: 5 },
      size: { x: 2, y: 4, z: 2 },
      color: '#ef4444',
      type: 'box'
    },
    {
      id: 'obstacle-2',
      position: { x: -8, y: 0, z: -3 },
      size: { x: 3, y: 2, z: 3 },
      color: '#3b82f6',
      type: 'box'
    },
    {
      id: 'obstacle-3',
      position: { x: 0, y: 0, z: 15 },
      size: { x: 1.5, y: 3, z: 1.5 },
      color: '#22c55e',
      type: 'box'
    }
  ],
  
  addObstacle: (obstacle) => {
    const newObstacle: Obstacle = {
      ...obstacle,
      id: Math.random().toString(36).substr(2, 9)
    };
    set(state => ({
      obstacles: [...state.obstacles, newObstacle]
    }));
  },
  
  removeObstacle: (id) => {
    set(state => ({
      obstacles: state.obstacles.filter(obstacle => obstacle.id !== id)
    }));
  },
  
  updateObstacle: (id, updates) => {
    set(state => ({
      obstacles: state.obstacles.map(obstacle =>
        obstacle.id === id ? { ...obstacle, ...updates } : obstacle
      )
    }));
  }
}));
