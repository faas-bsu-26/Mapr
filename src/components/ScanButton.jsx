import { useNavigate } from 'react-router-dom';

export default function ScanButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/save');
  };

  return (
    <button onClick={handleClick} className="relative w-24 h-24 flex items-center justify-center active:scale-95 transition-transform group">
      <div className="absolute w-20 h-20 rounded-full bg-white border border-black"></div>
      <div className="absolute w-16 h-16 rounded-full bg-white group-hover:bg-neutral-300 group-active:bg-neutral-300 border border-black transition-colors"></div>
    </button>
  );
}
