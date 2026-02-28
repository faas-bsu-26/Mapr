import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import { MapContext } from '../context/MapContext';

export default function MapList() {
  const { maps } = useContext(MapContext);
  const navigate = useNavigate();

  const handleScanNewMap = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg">
      <div className="w-full">
        <Title />
      </div>
      <div className="flex flex-col gap-1 p-8 w-full max-w-md mx-auto flex-1">
        {Object.entries(maps).reverse().map(([name]) => (
          <div key={name} className="bg-white border-2 border-black rounded px-4 py-3">
            <p className="text-black font-semibold">{name}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center p-8">
        <Button text="Scan New Map" onClick={handleScanNewMap} />
      </div>
    </div>
  );
}
