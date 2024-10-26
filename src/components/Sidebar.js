import React from 'react';

const Sidebar = ({ pins, setPins }) => {
  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this pin?')) {
      setPins((prevPins) => prevPins.filter((_, i) => i !== index));
    }
  };

  const focusPin = (lat, lng) => {
    const map = window.mapInstance; 
    if (map) {
      map.setView([lat, lng], 13); 
    } else {
      console.error('Map instance not available.');
    }
  };

  return (
    <div className="sidebar" style={{ width: '20%', padding: '10px', background: '#f7f7f7', overflowY: 'auto', maxHeight: '100vh' }}>
      <h2>Saved Pins</h2>
      {pins.length === 0 ? (
        <p>No saved pins.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {pins.map((pin, index) => (
            <li key={index} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <p><strong>Remark:</strong> {pin.remark}</p>
              <p><strong>Address:</strong> {pin.address}</p>
              <button onClick={() => focusPin(pin.lat, pin.lng)} style={{ marginRight: '10px' }}>View</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
