import { useContext } from 'react';
import { MapContext } from '../context/MapContext';

export default function DeleteButton({ mapName }) {
  const { deleteMap } = useContext(MapContext);

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteMap(mapName);
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-black font-bold w-8 h-8 flex items-center justify-center app-border-strong app-rounded-sm app-pressable-brightness app-transition-fast"
    >
      ✕
    </button>
  );
}
