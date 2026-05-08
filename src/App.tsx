import { useState } from 'react';
import SortingVisualizer from './SortingVisualizer';
import { RaceMode } from './components';

type Mode = 'visualizer' | 'race';

function App() {
  const [mode, setMode] = useState<Mode>('visualizer');

  if (mode === 'race')
    return <RaceMode onExit={() => setMode('visualizer')} />;

  return <SortingVisualizer onEnterRace={() => setMode('race')} />


}

export default App;
