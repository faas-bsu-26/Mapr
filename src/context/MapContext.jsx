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

  const value = {
    maps,
    addMap
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
