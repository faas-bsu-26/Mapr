import { createContext, useState } from 'react';

export const MapContext = createContext();

export function MapProvider({ children }) {
  const [maps, setMaps] = useState({});

  const addMap = (name, image) => {
    setMaps((prevMaps) => ({
      ...prevMaps,
      [name]: { name, image }
    }));
  };

  const deleteMap = (name) => {
    setMaps((prevMaps) => {
      const newMaps = { ...prevMaps };
      delete newMaps[name];
      return newMaps;
    });
  };

  const value = {
    maps,
    addMap,
    deleteMap
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
