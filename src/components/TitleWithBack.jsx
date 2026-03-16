import { useNavigate } from 'react-router-dom';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import Logo from './Logo';

export default function TitleWithBack({ backTo = '/maplist' }) {
  const navigate = useNavigate();

  return (
    <header className="relative w-full bg-title-bg">
      <div className="py-4 px-6">
        <div className="absolute left-6 top-1/2 -translate-y-1/2">
          <Logo />
        </div>
        <button
          type="button"
          onClick={() => navigate(backTo)}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-black transition-colors hover:text-zinc-700 active:text-zinc-600"
          aria-label="Go back"
        >
          <ArrowLeftCircleIcon className="w-13 h-13" />
        </button>
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