import { useState } from 'react';
import Title from '../components/Title';
import Button from '../components/Button';

export default function Save() {
  const [mapName, setMapName] = useState('');

  const handleSave = () => {
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg">
      <div className="w-full">
        <Title />
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <h2 className="text-xl font-semibold mb-4">Map Name:</h2>
        <input
          type="text"
          value={mapName}
          onChange={(e) => setMapName(e.target.value)}
          className="border-2 border-black rounded px-4 py-2 mb-6 w-64 opacity-100 bg-white"
          placeholder="Enter map name"
        />
        <Button text="Save" onClick={handleSave} />
      </div>
    </div>
  );
}
