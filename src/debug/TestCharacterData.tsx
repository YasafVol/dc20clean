import React from 'react';

const TestCharacterData: React.FC = () => {
  const testStorage = () => {
    const savedCharacters = localStorage.getItem('savedCharacters');
    console.log('Raw localStorage data:', savedCharacters);
    
    if (savedCharacters) {
      try {
        const parsed = JSON.parse(savedCharacters);
        console.log('Parsed characters:', parsed);
        console.log('Number of characters:', parsed.length);
        if (parsed.length > 0) {
          console.log('First character:', parsed[0]);
        }
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    } else {
      console.log('No saved characters found in localStorage');
    }
  };

  React.useEffect(() => {
    testStorage();
  }, []);

  return (
    <div style={{ padding: '20px', background: 'white', color: 'black', margin: '20px' }}>
      <h2>Debug: Character Data Test</h2>
      <button onClick={testStorage}>Check localStorage</button>
      <p>Check the browser console for localStorage data</p>
    </div>
  );
};

export default TestCharacterData;
