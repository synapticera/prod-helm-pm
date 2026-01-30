'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Scenario } from '../types';

interface ScenarioContextType {
  scenario: Scenario;
  setScenario: (scenario: Scenario) => void;
}

const ScenarioContext = createContext<ScenarioContextType | undefined>(undefined);

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [scenario, setScenario] = useState<Scenario>('moderate');

  return (
    <ScenarioContext.Provider value={{ scenario, setScenario }}>
      {children}
    </ScenarioContext.Provider>
  );
}

export function useScenario() {
  const context = useContext(ScenarioContext);
  if (context === undefined) {
    throw new Error('useScenario must be used within a ScenarioProvider');
  }
  return context;
}
