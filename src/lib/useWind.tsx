
import { create } from "zustand";

export interface WindSource {
  id: string;
  name: string;
  force: number;
  direction: number;
  type: 'constant' | 'variable';
  variableParams?: { frequency: number; amplitude: number };
  enabled: boolean;
  position: { x: number; y: number; z: number };
  radius: number;
}

export interface WindVector {
  x: number;
  y: number;
  z: number;
}

interface WindStore {
  windSources: WindSource[];
  addWindSource: (source: Omit<WindSource, 'id'>) => void;
  removeWindSource: (id: string) => void;
  updateWindSource: (id: string, updates: Partial<WindSource>) => void;
  getWindAtPosition: (position: { x: number; y: number; z: number }, time: number) => WindVector;
}

export const useWind = create<WindStore>((set, get) => ({
  windSources: [],
  
  addWindSource: (source) => {
    const newSource: WindSource = {
      ...source,
      id: Math.random().toString(36).substr(2, 9)
    };
    set(state => ({
      windSources: [...state.windSources, newSource]
    }));
  },
  
  removeWindSource: (id) => {
    set(state => ({
      windSources: state.windSources.filter(source => source.id !== id)
    }));
  },
  
  updateWindSource: (id, updates) => {
    set(state => ({
      windSources: state.windSources.map(source =>
        source.id === id ? { ...source, ...updates } : source
      )
    }));
  },
  
  getWindAtPosition: (position, time) => {
    const { windSources } = get();
    let totalWind = { x: 0, y: 0, z: 0 };
    
    for (const source of windSources) {
      if (!source.enabled) continue;
      
      const dx = position.x - source.position.x;
      const dy = position.y - source.position.y;
      const dz = position.z - source.position.z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      
      if (distance > source.radius) continue;
      
      const falloff = 1 - (distance / source.radius);
      let force = source.force * falloff;
      
      if (source.type === 'variable' && source.variableParams) {
        const { frequency, amplitude } = source.variableParams;
        force += amplitude * Math.sin(time * frequency);
      }
      
      const windX = force * Math.cos(source.direction);
      const windZ = force * Math.sin(source.direction);
      
      totalWind.x += windX;
      totalWind.y += 0; // No vertical wind for now
      totalWind.z += windZ;
    }
    
    return totalWind;
  }
}));
