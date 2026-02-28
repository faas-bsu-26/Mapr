import { useContext } from 'react';
import { MapContext } from '../context/MapContext';

export default function DeleteButton({ mapName }) {
  const { deleteMap } = useContext(MapContext);

  const handleDelete = () => {
    deleteMap(mapName);
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:brightness-75 active:brightness-50 text-black font-bold w-8 h-8 flex items-center justify-center rounded border-2 border-black"
    >
      ✕
    </button>
  );
}
