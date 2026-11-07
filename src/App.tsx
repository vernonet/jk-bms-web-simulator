/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Esp32WebSimulator } from './components/Simulator/Esp32WebSimulator';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Головний контейнер, де відображається тільки симулятор */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Esp32WebSimulator initialLanguage="en" />
      </main>
    </div>
  );
}
