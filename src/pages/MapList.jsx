import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import DeleteButton from '../components/DeleteButton';
import { MapContext } from '../context/MapContext';

export default function MapList() {
  const { maps } = useContext(MapContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(maps).length === 0) {
      navigate('/');
    }
  }, [maps, navigate]);

  const handleScanNewMap = () => {
    navigate('/');
  };

  const handleOpenMap = (name) => {
    navigate(`/map/${encodeURIComponent(name)}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary-bg">
      <div className="w-full">
        <Title />
      </div>
      <h2 className="text-xl font-semibold text-white px-8 pt-4 text-center">Saved Maps:</h2>
      <div className="flex flex-col gap-1 p-8 pt-4 w-full max-w-md mx-auto flex-1">
        {Object.entries(maps).reverse().map(([name]) => (
          <div
            key={name}
            className="bg-white border-2 border-black rounded p-2 flex items-center gap-2 shadow-[0_2px_0_0_#000] transition hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_#000]"
          >
            <button
              type="button"
              onClick={() => handleOpenMap(name)}
              className="flex-1 min-w-0 rounded px-2 py-2 flex items-center justify-between gap-2 cursor-pointer transition hover:bg-sky-100 active:bg-sky-200 focus-visible:outline-2 focus-visible:outline-black"
              aria-label={`Open map ${name}`}
            >
              <span className="text-black font-semibold truncate text-left">{name}</span>
              <span className="text-black/70 text-sm font-medium whitespace-nowrap">Open map ←</span>
            </button>
            <DeleteButton mapName={name} />
          </div>
        ))}
      </div>
      <div className="flex justify-center p-8">
        <Button text="Scan New Map" onClick={handleScanNewMap} />
      </div>
    </div>
  );
}
