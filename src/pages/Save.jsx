import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import { MapContext } from '../context/MapContext';

export default function Save() {
  const [mapName, setMapName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addMap, maps } = useContext(MapContext);

  const handleSave = () => {
    const trimmedName = mapName.trim();

    if (trimmedName === '') {
      setError('Please enter a map name');
    } else if (Object.prototype.hasOwnProperty.call(maps, trimmedName)) {
      setError('A map with that name already exists');
    } else {
      addMap(trimmedName, 'mall_map.jpg');
      navigate('/maplist');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg">
      <div className="w-full">
        <Title />
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <h2 className="text-xl text-white font-semibold mb-4">Map Name:</h2>
        <input
          type="text"
          value={mapName}
          autoFocus
          onChange={(e) => {
            setMapName(e.target.value);
            setError('');
          }}
          className="border-2 border-black rounded px-4 py-2 mb-6 w-64 opacity-100 bg-white"
          placeholder="Enter map name"
        />
        <Button text="Save" onClick={handleSave} />
        <div className="h-6 mt-4">
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
