import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import './App.css';

const loadPinsFromLocalStorage = () => {
  try {
    const storedPins = localStorage.getItem('pins');
    return storedPins ? JSON.parse(storedPins) : [];
  } catch (error) {
    console.error('Failed to parse pins from localStorage:', error);
    return [];
  }
};

function App() {
  
  const [pins, setPins] = useState(loadPinsFromLocalStorage);

  
  useEffect(() => {
    localStorage.setItem('pins', JSON.stringify(pins));
  }, [pins]);

  
  const savePins = (newPins) => {
    setPins(newPins); 
  };

  return (
    <div className="app">
      <Sidebar pins={pins} setPins={savePins} />
      <MapComponent pins={pins} setPins={savePins} />
    </div>
  );
}

export default App;
