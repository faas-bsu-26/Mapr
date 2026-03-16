import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Logo() {
  const navigate = useNavigate();
  return (
    <div
      className="rounded-full overflow-hidden w-12 h-12 cursor-pointer app-pressable-brightness app-transition-fast"
      onClick={() => navigate('/maplist')}
    >
      <img 
        src={logo} 
        alt="Logo" 
        className="w-full h-full object-cover"
      />
    </div>
  );
}
