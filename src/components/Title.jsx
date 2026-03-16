import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

export default function Title() {
  const navigate = useNavigate();

  return (
    <header className="relative w-full bg-title-bg">
      <div className="py-4 px-6">
        <div className="absolute left-6 top-1/2 -translate-y-1/2">
          <Logo />
        </div>
        <h1
          className="text-4xl font-bold text-center text-black cursor-pointer transition-colors hover:text-zinc-700 active:text-zinc-600"
          onClick={() => navigate('/maplist')}
        >
          Mapr
        </h1>
      </div>
    </header>
  );
}
