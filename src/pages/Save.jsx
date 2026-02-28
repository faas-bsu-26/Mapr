import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import { MapContext } from '../context/MapContext';

export default function Save() {
  const [mapName, setMapName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addMap } = useContext(MapContext);

  const handleSave = () => {
    if (mapName.trim() === '') {
      setError('Please enter a map name');
    } else {
      addMap(mapName, 'mall_map.jpg');
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
          onChange={(e) => {
            setMapName(e.target.value);
            setError('');
          }}
          className="border-2 border-black rounded px-4 py-2 mb-6 w-64 opacity-100 bg-white"
          placeholder="Enter map name"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button text="Save" onClick={handleSave} />
      </div>
    </div>
  );
}
