import React from 'react';
import { CharacterProvider } from './lib/stores/characterContext';
import CharacterCreation from './routes/character-creation/CharacterCreation.tsx';

function App() {
  return (
    <CharacterProvider>
      <div className="app">
        <CharacterCreation />
      </div>
    </CharacterProvider>
  );
}

export default App;
