import React, { useEffect } from 'react';
import L from 'leaflet';

const MapComponent = ({ pins, setPins }) => {
  useEffect(() => {
    
    if (!window.mapInstance) {
      const map = L.map('map').setView([51.505, -0.09], 5);
      window.mapInstance = map; 

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      map.on('click', async (e) => {
        const { lat, lng } = e.latlng;
        const remark = prompt('Enter remark for this pin:') || 'No remark';
        const address = await fetchAddress(lat, lng);

        const newPin = { lat, lng, remark, address };
        setPins((prevPins) => [...prevPins, newPin]);

        L.marker([lat, lng])
          .bindPopup(`<b>${remark}</b><br>${address}`)
          .addTo(map);
      });
    } else {
      window.mapInstance.invalidateSize(); 
    }

    pins.forEach((pin) => {
      L.marker([pin.lat, pin.lng])
        .bindPopup(`<b>${pin.remark}</b><br>${pin.address}`)
        .addTo(window.mapInstance);
    });
  }, [pins, setPins]);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      return data.display_name || 'Address not found';
    } catch (error) {
      console.error('Failed to fetch address:', error);
      return 'Address not found';
    }
  };

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default MapComponent;
